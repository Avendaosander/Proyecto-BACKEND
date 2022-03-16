const { DataTypes } = require('sequelize')

module.exports = (connection) => {
   const publicaciones = connection.define('publicaciones', {
      ID: {
         type: DataTypes.INTEGER(11),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      Nombre: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      Apellido: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      Cedula: {
         type: DataTypes.INTEGER(11),
         allowNull: false
      },
      Titulo: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      Contenido: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      Contador: {
         type: DataTypes.INTEGER(11),
         allowNull: false
      }
   },{
      createdAt:"CreatedDate",
      indexes: [
         {
            unique: true,
            fields:['Cedula']
         }
      ]
   })
   return { publicaciones }
}