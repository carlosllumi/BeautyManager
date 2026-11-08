
const express = require('express');
const router = express.Router();

const {
    listarClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
} = require('../controllers/clienteController');

// Listar clientes
router.get('/', listarClientes);

// Registrar cliente
router.post('/', crearCliente);

// Actualizar cliente
router.put('/:id', actualizarCliente);

// Eliminar cliente
router.delete('/:id', eliminarCliente);

module.exports = router;
