const {tablesAdmins} = require('../db/db');
const {User} = require('./classUser');

class Admin extends User{
    constructor(){
        super();
        this.modeloAdm=tablesAdmins.admins;
        this.telefono = null;
    }

    async agregarAdmin(data){
        let [admin, created] = await this.modeloAdm.findOrCreate({
            where: {
              Email:data.email, Cedula:data.cedula
            },
            defaults: {
              Nombre:data.nombre, Apellido:data.apellido, Email:data.email, Password:data.passwordHash, Cedula:data.cedula, Edad:data.edad, Telefono: data.telefono
            }
        });
        return [admin, created];
    }
    

    //BUSCAR ADMIN
    async buscarAdm(cedula){
        let adm = await this.modeloAdm.findAll({
            where:{
                Cedula : cedula
            }
        })
        return adm;
    }
    buscarAdminEdit(email){
        let adminis = this.modeloAdm.findAll({
            where: {Email:email}
        })
        return adminis;
        
    }
    //buscar user
    async buscarUser(correo){
        let usuario = await this.modeloUser.findAll({
            where:{
                Email : correo
            }
        })
        return usuario;
    }
    //ver una publicacion
    async VerPublicacion(cedula){
        console.log('entra aqui admin')
        let publicacion =this.modeloPublicacion.buscarPublicacion(cedula);
        if(publicacion.error){
            return publicacion.error;
        }else{
            return publicacion;
        }
    }
    //ver usuarios 
    async ListarUser(){
        let users = await this.modeloUser.findAll({
            attributes: [ 'ID', 'Nombre','Apellido','Cedula','Edad','Email','Password' ],
            order: [
                ['ID', 'ASC']
            ],
            raw: true
        })
        return users;
    }
    //EDITAR DATOS 
    async updatePublicacion(cedula, data){
        let actualizacion = this.modeloPublicacion.editarPublicacion(cedula, data);
        return actualizacion;
    }

    //editar Usuario

    async editarUser(cedula,data){
        let usuarioUpdate = this.modeloUser.update(data, {
            where:{
                Cedula : cedula
            }
        })
        if(usuarioUpdate){
            return usuarioUpdate;
        }else{
            return false;
        }
    }

    buscarPublicacionEdit(cedula){
        let publicacionEditar =this.modeloPublicacion.buscarParaEditar(cedula);
        return publicacionEditar;
    }

    //eliminar
    async deletePublicacion(cedula){
        this.modeloPublicacion.eliminarPublicacion(cedula);
    }
    //eliminar User
    async deleteUser(cedula){
        await this.modeloUser.destroy({
            where:{
                Cedula : cedula
            }
        });
    }

    async CambioPassAdm(cedula, newPass){
        let newClave = await this.modeloAdm.update({
            Password : newPass
        },{
            where: {
                Cedula: cedula
            }
        }); 
        return newClave;
    }

}

module.exports.Admin=Admin;