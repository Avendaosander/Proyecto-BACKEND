const { body } = require('express-validator')
const { validationCreate } = require('../helpers/ValidatorHelper')

const validarCampos = [
   body('nombre', "Ingrese el nombre")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('apellido', "Ingrese el apellido")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El apellido no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('cedula', "Ingrese su cedula")
      .exists(),
   body('titulo', "Ingrese el titulo")
      .exists()
      .isLength({min: 8}),
   body('media', "Ingrese una imagen o video de su publicacion")
      .exists(),
   body('contenido', "Ingrese el contenido de su publicacion")
      .exists(),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

const validarUser = [
   body('nombre', "Ingrese el nombre")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('apellido', "Ingrese el apellido")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El apellido no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('cedula', "Ingrese su cedula")
      .exists(),
   body('edad', "Ingrese su edad")
      .exists(),
   body('email', 'Ingrese un Email valido')
      .exists()
      .isEmail(),
   body('password', 'Ingrese una Contraseña valida')
      .exists(),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

const validarUpdate = [
   body('Nombre', "Ingrese el nombre")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('Apellido', "Ingrese el apellido")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El apellido no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('Cedula', "Ingrese su cedula")
      .exists(),
   body('Titulo', "Ingrese el titulo")
      .exists()
      .isLength({min: 8}),
   body('Contenido', "Ingrese el contenido de su publicacion")
      .exists(),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

const validarUserUpdate = [
   body('Nombre', "Ingrese el nombre")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El nombre no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('Apellido', "Ingrese el apellido")
      .exists()
      .custom( value => {
         if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\s]+$/g.test(value)) {
            return true
         } else {
            throw new Error('El apellido no es valido, ingrese solo letras')
         }
      })
      .isLength({min: 3}),
   body('Cedula', "Ingrese su cedula")
      .exists(),
   body('Edad', "Ingrese su edad")
      .exists(),
   body('Email', 'Ingrese un Email valido')
      .exists()
      .isEmail(),
   body('Password', 'Ingrese una Contraseña valida')
      .exists(),
   (req,res,next) => {
      validationCreate(req, res, next)
   }
]

module.exports = { validarUser, validarCampos, validarUpdate, validarUserUpdate }