const modeloPublicaciones = require('../db/publicaciones');

class Publicaciones{
    constructor(data){
        this.Nombre = data.Nombre
        this.Apellido= data.Apellido
        this.Cedula= data.Cedula
        this.titulo = data.titulo
        this.Contenido= data.Contenido
        this.Contador = 0;
        this.modelo = modeloPublicaciones
    }

    AgreagarPublicacion(){
        this.modelo.create({
            Nombre : this.Nombre,
            Apellido: this.Apellido,
            Cedula: this.Cedula,
            Titulo: this.titulo,
            Contenido: this.Contenido,
            Contador : this.Contador, 
        },{
            fields:['Nombre', 'Apellido', 'Cedula', 'Titulo','Contenido', 'Contador']
        })
    }
}
module.exports.Publicaciones=Publicaciones;