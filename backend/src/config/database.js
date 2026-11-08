
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mssql',
        dialectOptions: {
            options: {
                instanceName: process.env.DB_INSTANCE,
                encrypt: false,
                trustServerCertificate: true
            }
        },
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

async function conectarDB() {
    try {
        await sequelize.authenticate();
        console.log('SQL SERVER CONECTADO');
        console.log('Base de datos: BeautyManagerDB');
    } catch (error) {
        console.error('Error de conexión:', error.message);
        throw error;
    }
}

module.exports = {
    sequelize,
    conectarDB
};
