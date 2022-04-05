require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')

const indexRouter = require('./routes/index');

const app = express();

const options = {
   host: 'localhost',
   port: 3306,
   user: 'root',
   password: '',
   database: 'proyect'
}

const sessionStore = new MySQLStore(options);
app.use(session({
   key:'cookie_user',
   secret: 'claveclave',
   store: sessionStore,
   resave: false,
   saveUninitialized: false
}))

app.set("view engine", "ejs")
app.set("views", __dirname + "/views")

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;