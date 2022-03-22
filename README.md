## Bienvenido al programa ASAL 👨‍💻👩‍💻

### Instalación
Necesita descargar [NodeJS](https://nodejs.org/es/ "NodeJS")
Necesita descargar [MySQL](https://dev.mysql.com/downloads/mysql/ "MySQL")
Use  ***npm Install*** para descargar todas las dependencias

### Introducción
ASAL es un proyecto de BACKEND para la Universidad Valle del Momboy (UVM), el cual usa: NodeJS, Express, MySQL y Bootstrap

Es un programa de visualización de publicaciones, donde cada usuario debe registrarse para poder acceder a las funciones que ofrece la página

### Funcionamiento
**rol ( admin o user )**

Inicia Sesion en el caso de tener una cuenta ( /iniciar/login )
Registrarse en caso de no tenerla ( /register )
Entra en la pagina principal ( /:rol )
Muestra las publicaciones más relevantes

**Desde el navbar puede acceder a:**
*Para usuario común:*
Crear una publicacion ( /crear-publicacion/:rol )
Ver Publicaciones ( /publicaciones/:rol )

Los Usuarios al acceder a la publicaciones pueden solamente ver las publicaciones.

*Para Administradores:*
Crear una publicacion ( /crear-publicacion/:rol )
Ver Publicaciones ( /publicaciones/:rol )
Ver Usuarios ( /users/:rol )

Los administradores al acceder a las publicaciones pueden editar o eliminar una publiación ( /editar-publicacion/:cedula/:rol o /borrar-publicacion/:cedula/:rol )

Al igual que pueden editar o eliminar un usuario ( /editar-usuario/:cedula/:rol o /borrar-usuario/:cedula/:rol )

### Caracteristicas en proceso
> Uso de express-session
> Compatibilidad de publiaciones con imagenes y videos
> Paginador 10 en 10
> Contador de vistas de publicaciones
> Ordenar Publicaiones mas relevantes
> Mejoras de CSS
> Modificar pagina principal
> Vista individual para cada publicacion
> Vista para observar y administrar el perfil del usuario
> Cambiar el registrar adminstrador a una vista dentro de la session de un administrador

### Participantes
Alexander Avendaño / C.I: 29.694.896
Sara Gudiño / C.I: 30.391.704
Angel Arraiz / C.I: 30.302.123
Luis Paredes / C.I: 30.048.165