
const Cliente = require('../models/Cliente');

// Listar clientes
const listarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();

        res.status(200).json(clientes);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar clientes',
            error: error.message
        });
    }
};

// Registrar cliente
const crearCliente = async (req, res) => {
    try {
        let { nombre, telefono, id_usuario } = req.body;

        // Validar nombre
        if (!nombre || nombre.trim().length < 3) {
            return res.status(400).json({
                mensaje: 'El nombre debe tener al menos 3 caracteres'
            });
        }

        // Validar teléfono
        telefono = String(telefono || '').trim();

        if (!/^[0-9]{7,15}$/.test(telefono)) {
            return res.status(400).json({
                mensaje: 'El teléfono debe contener entre 7 y 15 dígitos'
            });
        }

        // Verificar teléfono duplicado
        const existeTelefono = await Cliente.findOne({
            where: { telefono }
        });

        if (existeTelefono) {
            return res.status(400).json({
                mensaje: 'El teléfono ya se encuentra registrado'
            });
        }

        // Registrar en SQL Server
        const nuevoCliente = await Cliente.create({
            nombre: nombre.trim(),
            telefono,
            id_usuario: id_usuario || null
        });

        res.status(201).json({
            mensaje: 'Cliente registrado correctamente',
            cliente: nuevoCliente
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar cliente',
            error: error.message
        });
    }
};

// Actualizar cliente
const actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, telefono } = req.body;

        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        if (!nombre || nombre.trim().length < 3) {
            return res.status(400).json({
                mensaje: 'El nombre debe tener al menos 3 caracteres'
            });
        }

        const telefonoLimpio = String(telefono || '').trim();

        if (!/^[0-9]{7,15}$/.test(telefonoLimpio)) {
            return res.status(400).json({
                mensaje: 'El teléfono debe contener entre 7 y 15 dígitos'
            });
        }

        const duplicado = await Cliente.findOne({
            where: { telefono: telefonoLimpio }
        });

        if (duplicado && duplicado.id_cliente !== Number(id)) {
            return res.status(400).json({
                mensaje: 'El teléfono ya pertenece a otro cliente'
            });
        }

        await cliente.update({
            nombre: nombre.trim(),
            telefono: telefonoLimpio
        });

        res.status(200).json({
            mensaje: 'Cliente actualizado correctamente',
            cliente
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar cliente',
            error: error.message
        });
    }
};

// Eliminar cliente
const eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;

        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                mensaje: 'Cliente no encontrado'
            });
        }

        await cliente.destroy();

        res.status(200).json({
            mensaje: 'Cliente eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar cliente',
            error: error.message
        });
    }
};

module.exports = {
    listarClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};
