const {tablesUsers, database} = require('../db/db');
const { Publicaciones } = require('./classPublicaciones');
const {Op} = require('sequelize');
let nuevaPublicacion = new Publicaciones();

class User{
    constructor(){
        this.modeloPublicacion = nuevaPublicacion;
        this.modeloUser = tablesUsers.users;
        this.nombre = null;
        this.apellido = null;
        this.email = null;
        this.password = null;
        this.cedula = null;
        this.edad = null;
    }

    //guardar usuarios
    async agregarUser(data){
        let [user, created] = await this.modeloUser.findOrCreate({
            where: {
              Email:data.email, Cedula:data.cedula
            },
            defaults: {
              Nombre:data.nombre, Apellido:data.apellido, Email:data.email, Password:data.passwordHash, Cedula:data.cedula, Edad:data.edad
            }
        });
        return [user, created];
    }
    //CREAR PUBLICACION
    CrearPublicacion(data){
        let nuevo = this.modeloPublicacion.AgreagarPublicacion(data);
        return nuevo;
    }

    //LISTA TODAS LAS PUBLICACIONES
    VerPublicaciones(){
        let publicacionesTotal= this.modeloPublicacion.verPublicaciones();
        return publicacionesTotal;
    }
    //ver una publicacion
    async VerPublicacion(cedula){
        console.log('entra aqui user')
        let publicacion =this.modeloPublicacion.buscarPublicacion(cedula);
        if(publicacion.error){
            return publicacion.error;
        }else{
            return publicacion;
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

    //CambiarClave
    async CambioPass(cedula, newPass){
        let newClave = await this.modeloUser.update({
            Password : newPass
        },{
            where: {
                Cedula: cedula
            }
        }); 
        return newClave;
    }

    buscarUserToEdit(cedula){
        let userEdit = this.modeloUser.findAll({
            where:{
                Cedula : cedula
            }
        });
         return userEdit;
    }

    //mejores publicaciones
    destacados(){
        return this.modeloPublicacion.PublicacionDestacada();
    }

}

module.exports.User=User;