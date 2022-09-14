const express = require('express');
const RouterEspecialidade = express.Router();
const EspecialidadeController = require('../controllers/EspecialidadeController');
const ValidationEspecialidade = require("../middlewares/ValidationEspecialidade");

RouterEspecialidade.post('/create', ValidationEspecialidade, EspecialidadeController.create);
RouterEspecialidade.get('/filter/all', EspecialidadeController.all);
RouterEspecialidade.get('/:id', EspecialidadeController.show);
RouterEspecialidade.put('/:id', EspecialidadeController.update);
RouterEspecialidade.delete('/:id', EspecialidadeController.delete);

module.exports = RouterEspecialidade;