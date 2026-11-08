
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Importar conexión con SQL Server
const { conectarDB } = require('./src/config/database');

// Importar rutas de servicios
const servicioRoutes = require('./src/routes/servicioRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const app = express();

app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(express.json());

// Rutas de servicios
app.use('/api/servicios', servicioRoutes);

// Rutas de clientes
app.use('/api/clientes', clienteRoutes);

//Ruta de usuarios
app.use('/api/usuarios', usuarioRoutes);



// Ruta de prueba
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'BeautyManager API funcionando correctamente'
    });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar aplicación
async function iniciarServidor() {
    try {
        // Primero conectar con SQL Server
        await conectarDB();

        // Después iniciar Express
        app.listen(PORT, () => {
            console.log(`BeautyManager API ejecutándose en puerto ${PORT}`);
        });

    } catch (error) {
        console.error('No se pudo iniciar BeautyManager:', error.message);
        process.exit(1);
    }
}

iniciarServidor();
