const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs"); /* Para encriptar contraseñas */
const { validarUser, validarCampos, validarUpdate, validarUpdateUser } = require('../validators/validator') /* Validaciones */

/* GET Home page. */
router.get('/home/:rol', function(req, res, next) {
  if (req.params.rol == 'admin') {
    res.render('index', { title: 'Bienvenido', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('index', { title: 'Bienvenido', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Login page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Iniciar Sesion' });
});
router.post('/login', function(req, res, next) {
  res.render('index', { title: 'Bienvenido' });
});
/* GET Register page. */
router.get('/register/:rol', function(req, res, next) {
  res.render('register', { title: 'Registrar', rol: req.params.rol });
});
router.post('/register/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('index', { title: 'Bienvenido', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('index', { title: 'Bienvenido', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Users page. */
router.get('/users/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('users', { title: 'Usuarios', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('users', { title: 'Usuarios', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Publications page. */
router.get('/publicaciones/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('publicaciones', { title: 'Publicaciones', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('publicaciones', { title: 'Publicaciones', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET New Publication page. */
router.get('/crear-publicacion/:rol', function(req, res, next) {
  if (req.params.rol == 'admin') {
    res.render('new-publication', { title: 'Crear Publicación', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('new-publication', { title: 'Crear Publicación', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
router.post('/crear-publicacion/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('publicaciones', { title: 'Publicaiones', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('publicaciones', { title: 'Publicaiones', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET New User page. */
router.get('/crear-usuario/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('new-user', { title: 'Crear Usuario', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('new-user', { title: 'Crear Usuario', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
router.post('/crear-usuario/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('users', { title: 'Usuarios', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('users', { title: 'Usuarios', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Update User page. */
router.get('/editar-usuario/:cedula/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('update-user', { title: 'Editar Usuario', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('update-user', { title: 'Editar Usuario', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
router.post('/editar-usuario/:cedula/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('users', { title: 'Usuarios', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('users', { title: 'Usuarios', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Update Publication page. */
router.get('/editar-publicacion/:cedula/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('update-publication', { title: 'Editar Publicacion', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('update-publication', { title: 'Editar Publicacion', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
router.post('/editar-publicacion/:cedula/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('publicaciones', { title: 'Publicaciones', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('publicaciones', { title: 'Publicaciones', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Delete User page. */
router.get('/borrar-usuario/:cedula/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('users', { title: 'Usuarios', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('users', { title: 'Usuarios', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Delete Publication page. */
router.get('/borrar-publicacion/:cedula/:rol', function(req, res, next) {
  if (req.params.rol === 'admin') {
    res.render('publicaciones', { title: 'Publicaciones', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('publicaciones', { title: 'Publicaciones', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});

module.exports = router;
