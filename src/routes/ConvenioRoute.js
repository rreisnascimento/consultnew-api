const express = require('express');
const RouterConvenio = express.Router();
const ConvenioController = require('../controllers/ConvenioController');

RouterConvenio.post('/create', ConvenioController.create);
RouterConvenio.get('/filter/all', ConvenioController.all);
RouterConvenio.get('/:id', ConvenioController.show);
RouterConvenio.put('/:id', ConvenioController.update);
RouterConvenio.delete('/:id', ConvenioController.delete);

module.exports = RouterConvenio;