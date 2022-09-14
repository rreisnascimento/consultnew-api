const express = require('express');
const RouterUsuario = express.Router();
const UsuarioController = require('../controllers/UsuarioController');
const UserValidationCreate = require('../middlewares/UserValidationCreate');
const UserValidationToken = require('../middlewares/UserValidationToken');

RouterUsuario.post('/create', UserValidationCreate, UsuarioController.create);
RouterUsuario.post('/createadm', UserValidationCreate, UsuarioController.userAdmin);
RouterUsuario.post('/createprof', UserValidationCreate, UsuarioController.userProfissional);
RouterUsuario.post('/validation', UserValidationToken, UsuarioController.validation);

module.exports = RouterUsuario;