const admin = require('../db/admin');
const modeloAdm = require('../db/admin');
const {User} = require('./classUser');

class Admin extends User{
    constructor(){
        super();
        this.modeloAdm=modeloAdm;
        this.telefono = null;
    }

    async agregarAdmin(data){
        let findAdm = await this.modeloAdm.findAll({
            where : {
                Nombre : data.nombre,
                Password : data.password
            },
            attributes:['Nombre', 'Password']
        })
    
        if(findAdm[0] === undefined){
            this.modeloAdm.create({
                Nombre: data.nombre,
                Apellido: data.apellido,
                Email:data.email,
                Password:data.password,
                Cedula:data.cedula,
                Edad: data.edad,
                Telefono:data.telefono
            },{
                fields: ['Nombre', 'Apellido','Email', 'Password', 'Cedula','Edad','Telefono']
            })
        }else{
            return false;
        }
    }

    //BUSCAR ADMIN
    async buscarAdm(correo){
        let adm = await this.modeloAdm.findAll({
            where:{
                Email : correo
            }
        })
        if(adm){
            return admin;
        }else{
            return false;
        }
    }

    //buscar user
    async buscarUser(correo){
        let usuario = await this.modeloUser.findAll({
            where:{
                Email : correo
            }
        })
        if(usuario){
            return usuario;
        }
        else{
            return false;
        }
    }
    //ver usuarios 
    async ListarUser(){
        let usuarios = await this.modeloUser.findAll({
            attributes : ['Nombre', 'Apellido','Email', 'Password', 'Cedula','Edad']
        })
        return usuarios;
    }
    //EDITAR DATOS 
    async editarPublicacion(titulo, dataNew){
        let busquedaPublicacion = await this.modeloPublicacion.findAll({
            where: {
                Titulo: titulo
            }
        });
        if(busquedaPublicacion[0] === undefined){
            return false;
        }
        const dataUpdate = await this.modeloPublicacion.update({
            Nombre : dataNew.nombre,
            Apellido: dataNew.apellido,
            Cedula: dataNew.cedula,
            Titulo: dataNew.titulo,
            Contenido: dataNew.contenido
        },{
            where :{
                Titulo : titulo
            }
        });
    
        if(dataUpdate){
            return dataUpdate;
        }else{
            return false;
        }
    }

    //editar Usuario

    async editarUser(correo,data){
        let usuarioUP = await this.modeloUser.findAll({
            where:{
                Email:correo
            }
        })
        if(!usuarioUP){
            return false;
        }
        let usuarioUpdate = this.modeloUser.update({
            Nombre : data.nombre,
            Apellido: data.apellido,
            Email:data.email,
            Password:data.password,
            Cedula:data.cedula,
            Edad: data.edad
        })
        if(usuarioUpdate){
            return usuarioUpdate;
        }else{
            return false;
        }
    }

    //eliminar
    async eliminarPublicacion(titulo){
        let DataDeleted = await this.modeloPublicacion.destroy({
            where: {
                Titulo : titulo
            }
        });
        if(DataDeleted > 0){
            //se elimino
        }else{
            //no se elimino
        }
    }
    //eliminar User
    async deleteUser(correo){
        let userDeleted = await this.modeloUser.destroy({
            where:{
                Email : correo
            }
        })
        if(userDeleted){
            return true;
        }else{
            return false;
        }
    }
}

module.exports.Admin=Admin;