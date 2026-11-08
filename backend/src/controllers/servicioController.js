
const Servicio = require('../models/Servicio');

// Listar todos los servicios
const listarServicios = async (req, res) => {
    try {
        const servicios = await Servicio.findAll({
            order: [['id_servicio', 'DESC']]
        });

        res.json(servicios);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar servicios',
            error: error.message
        });
    }
};

// Registrar un servicio
const crearServicio = async (req, res) => {
    try {
        const { nombre, precio, duracion_min } = req.body;

        // Validaciones en el backend
        if (!nombre || !nombre.trim()) {
            return res.status(400).json({
                mensaje: 'El nombre es obligatorio'
            });
        }

        if (!Number.isFinite(Number(precio)) || Number(precio) < 0) {
            return res.status(400).json({
                mensaje: 'El precio debe ser un número mayor o igual a cero'
            });
        }

        if (!Number.isInteger(Number(duracion_min)) ||
            Number(duracion_min) <= 0) {
            return res.status(400).json({
                mensaje: 'La duración debe ser un número entero positivo'
            });
        }

        const nuevoServicio = await Servicio.create({
            nombre: nombre.trim(),
            precio,
            duracion_min,
            activo: true
        });

        res.status(201).json({
            mensaje: 'Servicio registrado correctamente',
            servicio: nuevoServicio
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar servicio',
            error: error.message
        });
    }
};

// Actualizar un servicio
const actualizarServicio = async (req, res) => {
    try {
        const { id } = req.params;

        const servicio = await Servicio.findByPk(id);

        if (!servicio) {
            return res.status(404).json({
                mensaje: 'Servicio no encontrado'
            });
        }

        const { nombre, precio, duracion_min } = req.body;

        if (nombre !== undefined &&
            (!nombre.trim() || nombre.trim().length > 100)) {
            return res.status(400).json({
                mensaje: 'Nombre inválido'
            });
        }

        if (precio !== undefined &&
            (!Number.isFinite(Number(precio)) || Number(precio) < 0)) {
            return res.status(400).json({
                mensaje: 'Precio inválido'
            });
        }

        if (duracion_min !== undefined &&
            (!Number.isInteger(Number(duracion_min)) ||
            Number(duracion_min) <= 0)) {
            return res.status(400).json({
                mensaje: 'Duración inválida'
            });
        }

        await servicio.update({
            ...(nombre !== undefined && { nombre: nombre.trim() }),
            ...(precio !== undefined && { precio }),
            ...(duracion_min !== undefined && { duracion_min })
        });

        res.json({
            mensaje: 'Servicio actualizado correctamente',
            servicio
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar servicio',
            error: error.message
        });
    }
};

// Desactivar un servicio
const desactivarServicio = async (req, res) => {
    try {
        const { id } = req.params;

        const servicio = await Servicio.findByPk(id);

        if (!servicio) {
            return res.status(404).json({
                mensaje: 'Servicio no encontrado'
            });
        }

        await servicio.update({ activo: false });

        res.json({
            mensaje: 'Servicio desactivado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al desactivar servicio',
            error: error.message
        });
    }
};

module.exports = {
    listarServicios,
    crearServicio,
    actualizarServicio,
    desactivarServicio
};
