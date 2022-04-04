const {tablesPosts} = require('../db/db');

class Publicaciones{
    constructor(){
        this.modelo = tablesPosts.publicaciones; 
        this.Nombre = null;
        this.Apellido= null;
        this.Cedula= null;
        this.media;
        this.titulo = null;
        this.Contenido= null;
        this.Contador = 0;
    }

    async AgreagarPublicacion(data){
        let nuevo = await this.modelo.create({
            Nombre : data.nombre,
            Apellido: data.apellido,
            Cedula: data.cedula,
            Titulo: data.titulo,
            Media: data.media,
            Contenido: data.contenido,
            Contador : 0, 
        },{
            fields:['Nombre', 'Apellido', 'Cedula', 'Titulo','Media','Contenido', 'Contador']
        })
        return nuevo;
    }
    async verPublicaciones(page, size){
        let totalPublicaciones = await tablesPosts.publicaciones.findAndCountAll({
            limit: size,
            offset: page * size,
            order: [
              ['CreatedDate', 'DESC']
            ]
        })
        return totalPublicaciones;
    }
    async verPublicacionesRelevantes(){
        let totalPublicaciones = await this.modelo.findAll({
            attributes: [ 'Nombre','Apellido','Cedula','Titulo','Media','Contenido', 'Contador', 'CreatedDate' ],
            order: [
              ['Contador', 'DESC']
            ],
            raw: true,
            limit: 3
        })
        return totalPublicaciones;
    }

    async buscarPublicacion(cedula){
        let publicacion = await this.modelo.findAll({
            where:{
                Cedula : cedula
            }
        })
        if(publicacion){
            await this.modelo.increment({Contador: 1}, { where: { Cedula:cedula } })
            let publi = await this.modelo.findAll({
               where:{
                   Cedula : cedula
               }
            })
            return publi[0].dataValues;
        }else{
            return {'error':'no existe la publicacion'};
        }
    }
    async buscarParaEditar (cedula){
        let Editar = this.modelo.findAll({
            where:{
                Cedula : cedula
            }
        })
        return Editar;
    }
    //editar
    async editarPublicacion(cedula, data){
        const dataUpdate = await this.modelo.update(data,{
            where :{
                Cedula : cedula
            }
        });
        if(dataUpdate){
            return dataUpdate;
        }else{
            return {'error':'no se pudo actualizar la publicacion'};
        }
    }
    //eliminar publicacion
    async eliminarPublicacion(cedula){
        let dataDelete = await this.modelo.destroy({
            where :{
                Cedula : cedula
            }
        });
        return dataDelete;
    }

    async PublicacionDestacada(){
        let dosSemanas = new Date(new Date().setDate(new Date().getDate() - 14));
        let publicacionesOrdenadas=[];
        let elementMay = 0;
        let publicacionesRecientes = await this.modelo.findAll({
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
module.exports.Publicaciones=Publicaciones;