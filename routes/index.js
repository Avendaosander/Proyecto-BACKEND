const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs"); /* Para encriptar contraseñas */
const { validarUser, validarCampos, validarUpdate, validarUserUpdate } = require('../validators/validator') /* Validaciones */
const { tablesUsers, tablesPosts, tablesAdmins } = require('../db/db');

/* GET Home page. */
router.get('/home/:rol', (req, res) => {
  if (req.params.rol == 'admin') {
    res.render('index', { title: 'Administrador', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('index', { title: 'Usuario', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Login page. */
router.get('/login', (req, res) => {
  res.render('login', { title: 'Iniciar Sesion' });
});
router.post('/login', (req, res) => {
  if (req.body.rol == 'admin') {
    tablesAdmins.admins.findAll({
      where: { Email: req.body.Email }
    }).then(([userData])=>{
      bcrypt.compare(req.body.Password, userData.dataValues.Password, function(err, resp) {
        if (resp) {
          res.status(200).render('index', { title: "Administrador", rol: req.body.rol});
        } else {
          res.status(500).render('error', { user:'', users: [], error: 'Contraseña es incorrecta' });
        }
      });
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  } else if (req.body.rol == 'user') {
    tablesUsers.users.findAll({
      where: { Email: req.body.Email }
    }).then(([userData])=>{
      bcrypt.compare(req.body.Password, userData.dataValues.Password, function(err, resp) {
        if (resp) {
          res.status(200).render('index', { title: "Usuario", rol: req.body.rol});
        } else {
          res.status(500).render('error', { user:'', users: [], error: 'Contraseña es incorrecta' });
        }
      });
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Register page. */
router.get('/register/:rol', (req, res) => {
  res.render('register', { title: 'Registrar', rol: req.params.rol });
});
router.post('/register/:rol', validarUser, (req, res) => {
  const { nombre, apellido, edad, cedula, email, password } = req.body
  if (req.params.rol === 'admin') {
    const { telefono } = req.body
    let UserAdminClass = { nombre, apellido, edad, cedula, email, password, telefono}
    let passwordHash = bcrypt.hashSync(UserAdminClass.password, 10);
    tablesAdmins.admins.findOrCreate({
      where: {
        Email:UserAdminClass.email, Cedula:UserAdminClass.cedula
      },
      defaults: {
        Nombre:UserAdminClass.nombre, Apellido:UserAdminClass.apellido, Email:UserAdminClass.email, Password:passwordHash, Cedula:UserAdminClass.cedula, Edad:UserAdminClass.edad, Telefono:UserAdminClass.telefono
      }
    }).then(([user, created])=>{
      if (created) {
        res.status(200).render('index', { title: 'Administrador', rol: req.params.rol});
      } else {
        res.status(400).render('register', { title: 'Registrar un nuevo Administrador', error: 'El Administrador de cedula: '+user.dataValues.Cedula+' ya está registrado en el sistema' });
      }
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  } else if (req.params.rol === 'user') {
    let UserClass = { nombre, apellido, edad, cedula, email, password }
    let passwordHash = bcrypt.hashSync(UserClass.password, 10);
    tablesUsers.users.findOrCreate({
      where: {
        Email:UserClass.email ,Cedula:UserClass.cedula
      },
      defaults: {
        Nombre:UserClass.nombre, Apellido:UserClass.apellido, Email:UserClass.email, Password:passwordHash, Cedula:UserClass.cedula, Edad:UserClass.edad
      }
    }).then(([user, created])=>{
      if (created) {
        res.status(200).render('index', { title: 'Usuario', rol: req.params.rol});
      } else {
        res.status(400).render('register', { title: 'Registrar un nuevo usuario', error: 'El usuario de cedula: '+user.dataValues.Cedula+' ya está registrado en el sistema' });
      }
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Users page. */
router.get('/users/:rol', (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    tablesUsers.users.findAll({
      attributes: [ 'ID', 'Nombre','Apellido','Cedula','Edad','Email','Password' ],
      order: [
        ['ID', 'ASC']
      ],
      raw: true
    }).then((useData)=>{
      // console.log(useData)
      res.status(200).render('users', { title: 'Usuarios', users: useData, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { users: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Publications page. */
router.get('/publicaciones/:rol', (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    tablesPosts.publicaciones.findAll({
      attributes: [ 'Nombre','Apellido','Cedula','Titulo','Contenido', 'Contador', 'CreatedDate' ],
      order: [
        ['Titulo', 'ASC']
      ],
      raw: true
    }).then((publicacionData)=>{
      // console.log(publicacionData)
      res.status(200).render('publicaciones', { title: 'Publicaciones', publicaciones: publicacionData, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { publicaciones: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET New Publication page. */
router.get('/crear-publicacion/:rol', (req, res) => {
  if (req.params.rol == 'admin') {
    res.render('new-publication', { title: 'Crear Publicación', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('new-publication', { title: 'Crear Publicación', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
router.post('/crear-publicacion/:rol', validarCampos, (req, res) => {
  const { nombre, apellido, cedula, titulo, contenido } = req.body
  const CitaClass = { nombre, apellido, cedula, titulo, contenido }
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    tablesPosts.publicaciones.findOrCreate({
      where: {
        Cedula:CitaClass.cedula
      },
      defaults: {
        Nombre:CitaClass.nombre, Apellido:CitaClass.apellido, Cedula:CitaClass.cedula, Titulo:CitaClass.titulo, Contenido:CitaClass.contenido, Contador:0
      }
    }).then(([publicacion, created])=>{
      // console.log(created)
      if (created) {
        tablesPosts.publicaciones.findAll({
          attributes: [ 'Nombre','Apellido','Cedula','Titulo','Contenido', 'Contador', 'CreatedDate'],
          order: [
            ['Titulo', 'DESC']
          ],
          raw: true
        }).then((publicacionData)=>{
          // console.log(publicacionData)
          res.status(200).render('publicaciones', { title: 'Publicaciones', publicacion: publicacion , publicaciones: publicacionData, error: '', rol: req.params.rol});
        }).catch((err)=>{
          res.status(500).render('error', { publicacion:'', publicaciones: [], error: err });
        })
      } else {
        console.log(publicacion)
        res.status(400).render('new-publication', { title: 'Crear una nueva publicacion', error: 'El usuario de cedula: '+publicacion.dataValues.Cedula+' ya tiene una publicacion' });
      }
    }).catch((err)=>{
      res.status(500).render('error', { publicacion:'', publicaciones: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Update Publication page. */
router.get('/editar-publicacion/:cedula/:rol', (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    tablesPosts.publicaciones.findAll({
      where: { Cedula: req.params.cedula }
    }).then(([publicacionesData])=>{
      res.status(200).render('update-publication', { title: 'Editar Publicacion', publicacion: publicacionesData.dataValues, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { citas: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
router.post('/editar-publicacion/:cedula/:rol', validarUpdate, async (req, res, next) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    await tablesPosts.publicaciones.update(req.body, {
      where: { Cedula: req.params.cedula }
    })
    res.status(200).render('index', { title: 'Administrador', rol: req.params.rol})
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Update User page. */
router.get('/editar-usuario/:cedula/:rol', (req, res) => {
  if (req.params.rol === 'admin') {
    tablesUsers.users.findAll({
      where: { Cedula: req.params.cedula }
    }).then(([userData])=>{
      res.status(200).render('update-user', { title: 'Editar Usuario', users: userData.dataValues, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { users: [], error: err });
    })
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes Editar otro usuario'})
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
router.post('/editar-usuario/:cedula/:rol', validarUserUpdate, async (req, res, next) => {
  if (req.params.rol === 'admin') {
    await tablesUsers.users.update(req.body, {
      where: { Cedula: req.params.cedula }
    })
    res.status(200).render('index', { title: 'Administrador', rol: req.params.rol})
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes Editar otro usuario'})
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Delete User page. */
router.get('/borrar-usuario/:cedula/:rol', async(req, res, next) => {
  if (req.params.rol === 'admin') {
    await tablesUsers.users.destroy({
      where: { Cedula: req.params.cedula }
    })
    res.status(200).render('index', { title: 'Administrador', rol: req.params.rol})
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes borrar otro usuario'})
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Delete Publication page. */
router.get('/borrar-publicacion/:cedula/:rol', async (req, res, next) => {
  if (req.params.rol === 'admin') {
    await tablesPosts.publicaciones.destroy({
      where: { Cedula: req.params.cedula }
    })
    res.status(200).render('index', { title: 'Administrador', rol: req.params.rol})
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes borrar otra publicacion'})
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});

module.exports = router;
