const users = require('../db/user');
const publicaciones = require('../db/publicaiones');

class User{
    constructor(data){
        this.modeloPublicacion = publicaciones;
        this.modeloUser = users;
        this.nombre = data.nombre;
        this.apellido = data.apellido;
        this.edad = data.edad;
        this.cedula = data.cedula;
        this.email=data.email;
        this.password = data.password;
    }

    //guardar usuarios
    async agregarUser(){
            let findUser = await this.modeloUser.findAll({
                where : {
                    NombreUser : this.nombre,
                    PasswordUser : this.password
                },
                attributes:['NombreUser', 'PasswordUser']
            })
        
            if(findUser[0] === undefined){
                this.modeloUser.create({
                    NombreUser : this.nombre,
                    ApellidoUser: this.apellido,
                    EmailUser:this.email,
                    PasswordUser:this.password,
                    CedulaUser:this.cedula,
                    EdadUser: this.edad
                },{
                    fields: ['NombreUser', 'ApellidoUser','EmailUser', 'PasswordUser', 'CedulaUser','EdadUser']
                })
            }else{
                res.json({
                    mensaje : 'El usuario que desea agreagar ya existe',
                    usuario: findUser
                })
            }
        }

    //CREAR PUBLICACION
    CrearPublicacion(data){
        publicaciones.create({
            NombreCita : data.NombreCita,
            ApellidoCita: data.ApellidoCita,
            CedulaCita: data.CedulaCita,
            EdadCita: data.EdadCita,
            FechaCita : data.FechaCita, 
            HoraCita : data.HoraCita
        },{
            fields:['NombreCita', 'ApellidoCita', 'CedulaCita', 'EdadCita', 'FechaCita', 'HoraCita']
        })
    }
    //LISTA TODAS LAS PUBLICACIONES
    async VerPublicaciones(){
        await this.modeloPublicacion.findAll({
            attributes: ['NombreCita', 'ApellidoCita', 'CedulaCita', 'EdadCita', 'FechaCita', 'HoraCita']
        })
    }

}

module.exports.User=User;