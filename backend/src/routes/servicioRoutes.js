
const express = require('express');
const router = express.Router();

const {
    listarServicios,
    crearServicio,
    actualizarServicio,
    desactivarServicio
} = require('../controllers/servicioController');

// Consultar todos los servicios
router.get('/', listarServicios);

// Registrar un servicio
router.post('/', crearServicio);

// Actualizar un servicio
router.put('/:id', actualizarServicio);

// Desactivar un servicio
router.patch('/:id/desactivar', desactivarServicio);

module.exports = router;
