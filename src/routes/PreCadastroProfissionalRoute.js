const express = require('express');
const RouterPreCadastroProfissional = express.Router();
const PreCadastroProfissionalController = require('../controllers/PreCadastroProfissionalController');
const ValidationProfissional = require('../middlewares/ValidationProfissional');

RouterPreCadastroProfissional.post('/create', ValidationProfissional, PreCadastroProfissionalController.create);
RouterPreCadastroProfissional.get('/all', PreCadastroProfissionalController.all);

module.exports = RouterPreCadastroProfissional;