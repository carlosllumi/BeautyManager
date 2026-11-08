
const express = require('express');
const router = express.Router();

const {
    listarUsuariosClientes
} = require('../controllers/usuarioController');

router.get('/clientes', listarUsuariosClientes);

module.exports = router;
