const express = require('express');
const RouterProfissional = express.Router();
const ProfissionalController = require('../controllers/ProfissionalController');
const ValidationProfissional = require('../middlewares/ValidationProfissional');

RouterProfissional.get('/:id', ProfissionalController.show);
RouterProfissional.get('/filter/all', ProfissionalController.all);
RouterProfissional.post('/create', ValidationProfissional, ProfissionalController.create);
// RouterProfissional.post('/addespecialidadeprofissional', ProfissionalController.addespecialidadeprofissional);
// RouterProfissional.post('/addconvenioprofissional', ProfissionalController.addconvenioprofissional);
RouterProfissional.put('/:id', ValidationProfissional, ProfissionalController.update);
RouterProfissional.delete('/:id', ProfissionalController.deleteProfissional);
// RouterProfissional.delete('/delespecialidadeprofissional/:id', ProfissionalController.delespecialidadeprofissional);
// RouterProfissional.delete('/delconvenioprofissional/:id', ProfissionalController.delconvenioprofissional);

module.exports = RouterProfissional;