const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs"); /* Para encriptar contraseñas */
const { validarUser, validarCampos, validarUpdate, validarUserUpdate } = require('../validators/validator') /* Validaciones */
const { tablesUsers, tablesPosts, tablesAdmins } = require('../db/db');
const claseAdm = require('../controllers/classAdmin');
const claseUser = require('../controllers/classUser');
let Administradores = new claseAdm.Admin()
const Usuarios = new claseUser.User();
let respuesta;

/* GET Home page. */
router.get('/home/:rol', (req, res) => {
  respuesta = Administradores.VerPublicaciones().then((respuesta) => {
    // console.log(publicacionData)
    res.status(200).render('index', { publicaciones: respuesta, error: '', rol: req.params.rol });
  }).catch((err) => {
    res.render('error', { publicaciones: [], error: err });
  });
});
/* GET Login page. */
router.get('/login', (req, res) => {
  res.render('login', { title: 'Iniciar Sesion' });
});
router.post('/login', (req, res) => {
  if (req.body.rol == 'admin') {
    respuesta = Administradores.buscarAdm(req.body.Email).then(([respuesta]) => {
      bcrypt.compare(req.body.Password, respuesta.Password, function (err, resp) {
        if (respuesta != false) {
          res.status(200).render('index', {rol: req.body.rol});
        }else{
          res.status(500).render('error', { user: '', users: [], error: 'Contraseña es incorrecta' });
        }
      })}).catch ((err) => {
  res.status(500).render('error', { user: '', users: [], error: err });
});
  }else if (req.body.rol == 'user') {
  respuesta = Administradores.buscarUser(req.body.Email).then(([respuesta]) => {
    bcrypt.compare(req.body.Password, userData.dataValues.Password, function (err, resp) {
      if (respuesta != false) {
        res.status(200).render('index', {rol: req.body.rol});
  } else {
    res.status(500).render('error', { user: '', users: [], error: 'Contraseña es incorrecta' });
  }
      })
    }).catch ((err) => {
  res.status(500).render('error', { user: '', users: [], error: err });
});
  }else {
  res.render('error', { error: 'Rol invalido' });
}
});
/* GET Register page. */
router.get('/register/:rol', (req, res) => {
  res.render('register', { title: 'Registrar', rol: req.params.rol });
});

router.post('/register/:rol', validarUser, (req, res) => {
  if (req.params.rol === 'admin') {
    let passwordHash = bcrypt.hashSync(UserAdminClass.password, 10);
    respuesta = Administradores.agregarAdmin(req.body).then(([respuesta]) => {
      if (respuesta != false) {
        res.status(200).render('index', { rol: req.params.rol });
      } else {
        res.status(400).render('register', { title: 'Registrar un nuevo Administrador', error: 'El Administrador de cedula: ' + user.dataValues.Cedula + ' ya está registrado en el sistema' });
      }
    }).catch((err) => {
      res.status(500).render('error', { user: '', users: [], error: err });
    })
  } else if (req.params.rol === 'user') {
    let passwordHash = bcrypt.hashSync(UserClass.password, 10);
    respuesta = Usuarios.agregarUser(data).then(([user, created]) => {
      if (respuesta != false) {
        res.status(200).render('index', { rol: req.params.rol });
      } else {
        res.status(400).render('register', { title: 'Registrar un nuevo usuario', error: 'El usuario de cedula: ' + user.dataValues.Cedula + ' ya está registrado en el sistema' });
      }
    }).catch((err) => {
      res.status(500).render('error', { user: '', users: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
/* GET Users page. */
router.get('/users/:rol', (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    respuesta = Administradores.ListarUser().then((useData) => {
      //en respuesta estan los usuarios almacenados en la BD
      // console.log(useData)
      res.status(200).render('users', { title: 'Usuarios', users: useData, error: '', rol: req.params.rol });
    }).catch((err) => {
      res.render('error', { users: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
/* GET Publications page. */
router.get('/publicaciones/:rol', (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    respuesta = Usuarios.VerPublicaciones().then((publicacionData) => {
      //en respuesta estan todas las publicaciones
      // console.log(publicacionData)
      res.status(200).render('publicaciones', { title: 'Publicaciones', publicaciones: publicacionData, error: '', rol: req.params.rol });
    }).catch((err) => {
      res.render('error', { publicaciones: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
/* GET New Publication page. */
router.get('/crear-publicacion/:rol', (req, res) => {
  if (req.params.rol == 'admin') {
    res.render('new-publication', { title: 'Crear Publicación', rol: req.params.rol });
  } else if (req.params.rol === 'user') {
    res.render('new-publication', { title: 'Crear Publicación', rol: req.params.rol });
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
router.post('/crear-publicacion/:rol', validarCampos, (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    Usuarios.CrearPublicacion(req.body).then(([publicacion, created]) => {
      // console.log(created)
      if (created) {
        respuesta = Usuarios.VerPublicaciones().then((publicacionData) => {
          //las publicaciones estan en respuesta
          // console.log(publicacionData)
          res.status(200).render('publicaciones', { title: 'Publicaciones', publicaciones: publicacionData, error: '', rol: req.params.rol });
        }).catch((err) => {
          res.status(500).render('error', { publicacion: '', publicaciones: [], error: err });
        })
      } else {
        console.log(publicacion)
        res.status(400).render('new-publication', { title: 'Crear una nueva publicacion', error: 'El usuario de cedula: ' + publicacion.dataValues.Cedula + ' ya tiene una publicacion' });
      }
    }).catch((err) => {
      res.status(500).render('error', { publicacion: '', publicaciones: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
/* GET Update Publication page. */
router.get('/editar-publicacion/:cedula/:rol', (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    respuesta = Administradores.VerPublicacion(req.body.titulo).then(([publicacionesData]) => {
      res.status(200).render('update-publication', { title: 'Editar Publicacion', publicacion: publicacionesData.dataValues, error: '', rol: req.params.rol });
    }).catch((err) => {
      res.render('error', { citas: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
router.post('/editar-publicacion/:cedula/:rol', validarUpdate, async (req, res, next) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    respuesta = Administradores.editarPublicacion(req.body);
    //si respuesta es false es que no se ha editado
    res.status(200).render('index', { rol: req.params.rol })
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
/* GET Update User page. */
router.get('/editar-usuario/:cedula/:rol', (req, res) => {
  if (req.params.rol === 'admin') {
    Administradores.buscarUser(req.body.email).then(([userData]) => {
      res.status(200).render('update-user', { title: 'Editar Usuario', users: userData.dataValues, error: '', rol: req.params.rol });
    }).catch((err) => {
      res.render('error', { users: [], error: err });
    })
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes Editar otro usuario' })
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
router.post('/editar-usuario/:cedula/:rol', validarUserUpdate, async (req, res, next) => {
  if (req.params.rol === 'admin') {
    Administradores.editarUser(req.params.email, req.body);
    res.status(200).render('index', { rol: req.params.rol })
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes Editar otro usuario' })
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
/* GET Delete User page. */
router.get('/borrar-usuario/:cedula/:rol', async (req, res, next) => {
  if (req.params.rol === 'admin') {
    Administradores.deleteUser(req.params.email);
    res.status(200).render('index', { rol: req.params.rol })
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes borrar otro usuario' })
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
/* GET Delete Publication page. */
router.get('/borrar-publicacion/:cedula/:rol', async (req, res, next) => {
  if (req.params.rol === 'admin') {
    Administradores.eliminarPublicacion(req.params.titulo);
    res.status(200).render('index', { rol: req.params.rol })
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes borrar otra publicacion' })
  } else {
    res.render('error', { error: 'Rol invalido' })
  }
});
module.exports = router;
