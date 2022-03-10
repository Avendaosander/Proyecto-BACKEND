const { Sequelize, Op, fn } = require("sequelize");
const PublicaionesModel = require('./publicaiones')
const UsersModel = require('./user')
const AdminsModel = require('./admin')

const config = {
   HOST: process.env.DB_HOST,
   USER: process.env.DB_USER,
   PASSWORD: process.env.DB_PASSWORD,
   DB: process.env.DB_NAME,
   dialect: 'mysql',
   pool:{
      max: 2,
      min: 0,
      acquire: 30000,
      idle: 1000
   }
}

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD,{
   host: config.HOST,
   dialect: config.dialect,
   operatorsAliases: 0,
   pool: config.pool,
   // storage: './proyect_backend_db.sql'
})

sequelize.sync({force: process.env.DB_FORCE === "false"}) /* Se debe corregir */

module.exports = {
   database: sequelize,
   tablesCitas: PublicaionesModel(sequelize),
   tablesUsers: UsersModel(sequelize),
   tablesAdmins: AdminsModel(sequelize),
   op: Op,
   fn: fn
}