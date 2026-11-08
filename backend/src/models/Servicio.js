const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Servicio = sequelize.define('Servicio', {
    id_servicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    duracion_min: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

}, {
    tableName: 'SERVICIOS',
    timestamps: false
});

module.exports = Servicio;