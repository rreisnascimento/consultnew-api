const express = require('express');
const RouterPreCadastroProfissional = express.Router();
const PreCadastroProfissionalController = require('../controllers/PreCadastroProfissionalController');
const ValidationProfissional = require('../middlewares/ValidationProfissional');

RouterPreCadastroProfissional.post('/create', ValidationProfissional, PreCadastroProfissionalController.create);

module.exports = RouterPreCadastroProfissional;