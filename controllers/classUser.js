const publicaciones = require('../db/publicaciones');
const users = require('../db/user');
const { Publicaciones } = require('./classPublicaciones');
const {Op} = require('sequelize');

class User{
    constructor(){
        this.modeloPublicacion = publicaciones;
        this.modeloUser = users;
        this.nombre = null;
        this.apellido = null;
        this.email = null;
        this.password = null;
        this.cedula = null;
        this.edad = null;
    }

    //guardar usuarios
    async agregarUser(data){
            let findUser = await this.modeloUser.findAll({
                where : {
                    Nombre : data.nombre,
                    Password : data.password
                },
                attributes:['Nombre', 'Password']
            })
        
            if(findUser[0] === undefined){
                this.modeloUser.create({
                    Nombre : data.nombre,
                    Apellido: data.apellido,
                    Email:data.email,
                    Password:data.password,
                    Cedula:data.cedula,
                    Edad: data.edad
                },{
                    fields: ['Nombre', 'Apellido','Email', 'Password', 'Cedula','Edad']
                })
            }else{
            //los datos ya existen
            }
        }

    //CREAR PUBLICACION
    CrearPublicacion(data){
        let nuevaPublicacion = new Publicaciones(data);
        nuevaPublicacion.AgreagarPublicacion();
    }

    //LISTA TODAS LAS PUBLICACIONES
    async VerPublicaciones(){
        let totalPublicaciones = await this.modeloPublicacion.findAll({
            attributes: ['Nombre', 'Apellido', 'Cedula', 'Titulo']
        })
        return totalPublicaciones;
    }

    //ver una publicacion
    async VerPublicacion(titulo){
        let publicacion = await this.modeloPublicacion.findAll({
            where:{
                Titulo : titulo
            }
        })
        if(publicacion){
            publicacion.contador++;
            return publicacion;
        }else{
            //la publicacion no existe
        }
    }
    //ver las publicaciones destacadas
    async PublicacionDestacada(){
        let dosSemanas = new Date(new Date().setDate(new Date().getDate() - 14));
        let publicacionesOrdenadas=[];
        let elementMay = 0;
        let publicacionesRecientes = await this.modeloPublicacion.findAll({
            where: {
                CreatedDate:{
                    [Op.gt]: dosSemanas,
                    [Op.lt]: new Date(),
                }
            },
            attributes: ['Nombre', 'Apellido', 'Cedula', 'Titulo', 'Contador'] 
        }); 
        for(let i = 0; i<publicacionesRecientes.length;i++){
            elementMay = 0;
            publicacionesRecientes.forEach(element => {
                if(element.Contador>elementMay){
                    elementMay = element.Contador;
                }
            });
            publicacionesOrdenadas[i] = elementMay; 
        }
        return publicacionesOrdenadas;
    }




}

module.exports.User=User;