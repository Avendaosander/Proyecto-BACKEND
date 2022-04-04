const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs"); /* Para encriptar contraseñas */
const { validarUser, validarCampos, validarUpdate, validarUserUpdate } = require('../validators/validator') /* Validaciones */
const { tablesUsers, tablesPosts, tablesAdmins } = require('../db/db');
const multer = require('multer')
const path = require('path');
let {User} = require('../controllers/classUser');
let {Admin} = require('../controllers/classAdmin');

let usuarios = new User();
let administradores = new Admin();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../imagenes'),
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage,
  destination: path.join(__dirname, '../imagenes'),
  limits: {fileSize: 1000000}
}).single('media')

/* GET Home page. */
router.get('/:rol', (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    usuarios.VerPublicacionesRelevantes().then((publicacionesTotal)=>{
      res.status(200).render('index', { publicaciones: publicacionesTotal, error: '', rol: req.params.rol });
    }).catch((err)=>{
      res.render('error', { publicaciones: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Login page. */
router.get('/iniciar/login', (req, res) => {
  res.render('login', { title: 'Iniciar Sesion' });
});
router.post('/iniciar/login', (req, res) => {
  if (req.body.rol == 'admin') {
    administradores.buscarAdm(req.body.Email).then(([userData])=>{
      bcrypt.compare(req.body.Password, userData.Password, function(err, resp) {
        if (resp) {
          administradores.VerPublicaciones().then((publicacionesTotal)=>{
            res.status(200).render('index', { publicaciones: publicacionesTotal, error: '', rol: req.body.rol });
          }).catch((err)=>{
            res.render('error', { publicaciones: [], error: err });
          })
        } else {
          res.status(500).render('error', { user:'', users: [], error: 'Contraseña es incorrecta' });
        }
      });
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  } else if (req.body.rol == 'user') {
    administradores.buscarUser(req.body.Email).then(([userData])=>{
     bcrypt.compare(req.body.Password, userData.Password, function(err, resp) {
         if (resp) {
           usuarios.VerPublicaciones().then((publicacionesTotal)=>{
             res.status(200).render('index', { publicaciones: publicacionesTotal, error: '', rol: req.body.rol });
           }).catch((err)=>{
             res.render('error', { publicaciones: [], error: err });
           })
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
router.get('/crear-admin/:rol', (req, res) => {
  res.render('register-admin', { title: 'Crear Administrador', rol: req.params.rol });
});
router.post('/crear-admin/:rol', validarUser, (req, res) => {
  if (req.params.rol === 'admin') {
    const { nombre, apellido, edad, cedula, email, password, telefono} = req.body
    let passwordHash = bcrypt.hashSync(password, 10);
    administradores.agregarAdmin({ nombre, apellido, edad, cedula, email, passwordHash,telefono}).then(([admin, created])=>{
      if (created) {
        administradores.VerPublicaciones().then((publicacionesTotal)=>{
          // console.log(publicacionesTotal)
          res.status(200).render('index', { publicaciones: publicacionesTotal, error: '', rol: req.params.rol });
        }).catch((err)=>{
          res.render('error', { publicaciones: [], error: err });
        })
      } else {
        res.status(400).render('register', { title: 'Registrar un nuevo Administrador', error: 'El Administrador de cedula: '+admin.dataValues.Cedula+' ya está registrado en el sistema', rol : req.params.rol });
      }
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes crear un administrador'})
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Register page. */
router.get('/register/:rol', (req, res) => {
  res.render('register', { title: 'Registrar', rol: req.params.rol });
});
router.post('/register/:rol', validarUser, (req, res) => {
  const { nombre, apellido, edad, cedula, email, password} = req.body
  if (req.params.rol === 'user'){
    let passwordHash = bcrypt.hashSync(password, 10);
    console.log(passwordHash);
    usuarios.agregarUser({ nombre, apellido, edad, cedula, email, passwordHash }).then(([user, created])=>{
      if (created) {
        usuarios.VerPublicacionesRelevantes().then((publicacionesTotal)=>{
          // console.log(publicacionesTotal)
          res.status(200).render('index', { publicaciones: publicacionesTotal, error: '', rol: req.params.rol });
        }).catch((err)=>{
          res.render('error', { publicaciones: [], error: err });
        })
      } else {
        res.status(400).render('register', { title: 'Registrar un nuevo usuario', error: 'El usuario de cedula: '+user.dataValues.Cedula+' ya está registrado en el sistema', rol:req.params.rol });
      }
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Perfil page. */
router.get('/perfil/:cedula/:rol', (req, res) => {
  if (req.params.rol === 'admin') {
    administradores.perfil(req.params.cedula).then(([adm])=>{
      res.status(200).render('perfil', { title: 'Perfil', users: adm, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { user: [], error: err });
    })
  } else if (req.params.rol === 'user') {
    administradores.perfilUser(req.params.cedula).then(([userData])=>{
      res.status(200).render('perfil', { title: 'Perfil', users: userData, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { user: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
}); 
/* GET Users page. */
router.get('/users/:rol', (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    administradores.ListarUser().then((users)=>{
      // console.log(useData)
      res.status(200).render('users', { title: 'Usuarios', users: users, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { users: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Publications page. */
router.get('/publicaciones/:rol', async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page)
  const sizeAsNumber = Number.parseInt(req.query.size)

  let page = 0
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber
  }

  let size = 10
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber
  }
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    await usuarios.VerPublicaciones(page, size).then((publicacionData)=>{
      res.status(200).render('publicaciones', { title: 'Publicaciones', publicaciones: publicacionData.rows, page, size, totalPages: Math.ceil(publicacionData.count / size), error: '', rol: req.params.rol });
    }).catch((err)=>{
      res.render('error', { publicaciones: [], error: err });
    })
  }else{
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
router.post('/crear-publicacion/:rol', upload, (req, res) => {
  const { nombre, apellido, cedula, titulo, contenido } = req.body
  const media = req.file.originalname
  const pageAsNumber = Number.parseInt(req.query.page)
  const sizeAsNumber = Number.parseInt(req.query.size)

  let page = 0
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber
  }

  let size = 10
  if (!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0 && sizeAsNumber < 10) {
    size = sizeAsNumber
  }
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    usuarios.CrearPublicacion({ nombre, apellido, cedula, titulo, media, contenido }).then((nuevo)=>{
      console.log(nuevo)
      if (nuevo) {
        usuarios.VerPublicaciones(page, size).then((publicacionesTotal)=>{
          // console.log(publicacionData)
          res.status(200).render('publicaciones', { title: 'Publicaciones', publicaciones: publicacionesTotal, page, size, totalPages: Math.ceil(publicacionData.count / size), error: '', rol: req.params.rol});
        }).catch((err)=>{
          res.status(500).render('error', { publicacion:'', publicaciones: [], error: err });
        })
      } else {
        console.log(nuevo)
        res.status(400).render('new-publication', { title: 'Crear una nueva publicacion', error: 'El usuario de cedula: '+publicacion.dataValues.Cedula+' ya tiene una publicacion' });
      }
    }).catch((err)=>{
      res.status(500).render('error', { publicacion:'', publicaciones: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Ver Publication page. */
router.get('/ver-publicacion/:cedula/:rol', (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    administradores.VerPublicacion(req.params.cedula).then((publicacion)=>{
      res.status(200).render('publication', { title: publicacion.Titulo, publicacion: publicacion, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { citas: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Update Publication page. */
router.get('/editar-publicacion/:cedula/:rol', (req, res) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    administradores.buscarPublicacionEdit(req.params.cedula).then(([publicacionEditar])=>{
      res.status(200).render('update-publication', { title: 'Editar Publicacion', publicacion: publicacionEditar.dataValues, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { citas: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
router.post('/editar-publicacion/:cedula/:rol', validarUpdate, async (req, res, next) => {
  if (req.params.rol === 'admin' || req.params.rol === 'user') {
    await administradores.updatePublicacion(req.params.cedula, req.body);
    await administradores.VerPublicacionesRelevantes().then((publicacionesTotal)=>{
      // console.log(publicacionData)
      res.status(200).render('index', { publicaciones: publicacionesTotal, error: '', rol: req.params.rol });
    }).catch((err)=>{
      res.render('error', { publicaciones: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Update User page. */
router.get('/editar-usuario/:cedula/:rol', (req, res) => {
  if (req.params.rol === 'admin') {
    administradores.buscarAdminEdit(req.params.cedula).then(([adm])=>{
      res.status(200).render('update-user', { title: 'Editar Usuario', users: adm, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { user: [], error: err });
    })
  } else if (req.params.rol === 'user') {
    administradores.buscarUserToEdit(req.params.cedula).then(([usuario])=>{
      res.status(200).render('update-user', { title: 'Editar Usuario', users: usuario.dataValues, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { users: [], error: err });
    })
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
router.post('/editar-usuario/:cedula/:rol', validarUserUpdate,(req, res, next) => {
  if (req.params.rol === 'admin') {
    administradores.editarUser(req.params.cedula, req.body);
    administradores.ListarUser().then((users)=>{
      res.status(200).render('users', { title: 'Usuarios', users: users, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { users: [], error: err });
    })
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes Editar otro usuario'})
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Delete User page. */
router.get('/borrar-usuario/:cedula/:rol', async(req, res, next) => {
  if (req.params.rol === 'admin') {
    administradores.deleteUser(req.params.cedula)
    administradores.ListarUser().then((users)=>{
      // console.log(users)
      res.status(200).render('users', { title: 'Usuarios', users: users, error: '', rol: req.params.rol});
    }).catch((err)=>{
      res.render('error', { users: [], error: err });
    })
  }else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes borrar otro usuario'})
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});
/* GET Delete Publication page. */
router.get('/borrar-publicacion/:cedula/:rol', (req, res, next) => {
  if (req.params.rol === 'admin') {
    administradores.deletePublicacion(req.params.cedula);
    administradores.VerPublicacionesRelevantes().then((publicacionesTotal)=>{
      // console.log(publicacionesTotal)
      res.status(200).render('index', { publicaciones: publicacionesTotal, error: '', rol: req.params.rol });
    }).catch((err)=>{
      res.render('error', { publicaciones: [], error: err });
    })
  } else if (req.params.rol === 'user') {
    res.render('error', { error: 'Eres un usuario, no puedes borrar otra publicacion'})
  } else {
    res.render('error', { error: 'Rol invalido'})
  }
});

router.get('/recuperacion/:rol', (req, res) => {
  res.render('recuperacion', {title: 'Recuperar Contraseña'})
})

router.post('/recuperacion/:rol', (req,res)=>{
  if(req.params.rol === 'admin'){
    administradores.buscarAdm(req.body.Email).then(([userData])=>{
      bcrypt.compare(req.body.PasswordOld, userData.Password, function(err, resp) {
        if (resp) {
          administradores.buscarAdminEdit(req.body.Email).then(([adm])=>{
            administradores.CambioPassAdm(req.body.Email, bcrypt.hashSync(req.body.Password, 10))
            let pub = administradores.VerPublicacionesRelevantes();
            res.status(200).render('index', { publicaciones: pub, error: '', rol: req.params.rol });
          }).catch((err)=>{
           res.render('error', { publicaciones: [], error: err });
           })
        } else {
          res.status(500).render('error', { user:'', users: [], error: 'Contraseña es incorrecta' });
        }
      });
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  }else if(req.params.rol === 'user'){
    administradores.buscarUser(req.body.Email).then(([userData])=>{
      console.log(userData)
      bcrypt.compare(req.body.PasswordOld, userData.Password, function(err, resp) {
        if (resp) {
          administradores.buscarUser(req.body.Email).then((user)=>{
            usuarios.CambioPass(req.body.Email, bcrypt.hashSync(req.body.Password, 10));
            let pubs = usuarios.VerPublicacionesRelevantes();
            res.status(200).render('index', { publicaciones: pubs, error: '', rol: req.params.rol });
          }).catch((err)=>{
            res.render('error', { publicaciones: [], error: err });
          })
        } else {
          res.status(500).render('error', { user:'', users: [], error: 'Contraseña es incorrecta' });
        }
      });
    }).catch((err)=>{
      res.status(500).render('error', { user:'', users: [], error: err });
    })
  }else{
    res.render('error', { error: 'Rol invalido'})
  }
});
module.exports = router;