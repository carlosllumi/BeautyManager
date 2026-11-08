
const Usuario = require('../models/Usuario');

// Listar usuarios activos con rol CLIENTE
const listarUsuariosClientes = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: [
                'id_usuario',
                'nombre',
                'correo'
            ],
            where: {
                id_rol: 2,
                estado: true
            },
            order: [['nombre', 'ASC']]
        });

        res.status(200).json(usuarios);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al listar usuarios',
            error: error.message
        });
    }
};

module.exports = {
    listarUsuariosClientes
};
