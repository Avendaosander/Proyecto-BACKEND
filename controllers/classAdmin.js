const modeloAdm = require('../db/admin');
const {User} = require('./classUser');

class Admin extends User{
    constructor(data){
        super(data);
        this.modeloAdm=modeloAdm;
        this.telefono = data.telefono;
    }

    async agregarAdmin(){
        let findAdm = await this.modeloAdm.findAll({
            where : {
                NombreUser : this.nombre,
                PasswordUser : this.password
            },
            attributes:['NombreUser', 'PasswordUser']
        })
    
        if(findAdm[0] === undefined){
            this.modeloAdm.create({
                NombreUser : this.nombre,
                ApellidoUser: this.apellido,
                EmailUser:this.email,
                PasswordUser:this.password,
                CedulaUser:this.cedula,
                EdadUser: this.edad,
                TelefonoUser:this.telefono
            },{
                fields: ['NombreUser', 'ApellidoUser','EmailUser', 'PasswordUser', 'CedulaUser','EdadUser','TelefonoUser']
            })
        }else{
            res.json({
                mensaje : 'El administrador que desea agreagar ya existe',
                usuario: findAdm
            })
        }
    }

    //EDITAR DATOS 
    async editarPublicacion(id, dataNew){
        let busquedaPublicacion = await this.modeloPublicacion.findAll({
            where: {
                IDCita: id
            }
        });
        if(busquedaPublicacion[0] === undefined){
            //la pagina no existe
        }
        const dataUpdate = await this.modeloPublicacion.update({
            NombreUser : dataNew.NombreUser,
            ApellidoUser: dataNew.ApellidoUser,
            EmailUser: dataNew.EmailUser,
            PasswordUser: dataNew.PasswordUser,
            CedulaUser: dataNew.CedulaUser,
            EdadUser: dataNew.EdadUser,
            TelefonoUser: dataNew.TelefonoUser
        },{
            where :{
                IDCita : id
            }
        });
    
        if(dataUpdate){
            //se actualizo
        }else{
            // no se actualizo
        }
    }

    //eliminar
    async eliminarPublicacion(id){
        let DataDeleted = await this.modeloPublicacion.destroy({
            where: {
                IDCita : id
            }
        });
        if(DataDeleted > 0){
            //se elimino
        }else{
            //no se elimino
        }
    }
}

module.exports.Admin=Admin;