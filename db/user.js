const { DataTypes } = require('sequelize')

module.exports = (connection) => {
   const users = connection.define('users', {
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
      Email: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      Password: {
         type: DataTypes.STRING(255),
         allowNull: false
      },
      Cedula: {
         type: DataTypes.INTEGER(11),
         allowNull: false
      },
      Edad: {
         type: DataTypes.INTEGER(2),
         allowNull: false
      },
      Rol: {
         type: DataTypes.STRING(10),
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
   return { users }
}