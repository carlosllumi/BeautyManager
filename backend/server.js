
const express = require('express');
const cors = require('cors');

const { conectarDB } = require('./src/config/database');

const servicioRoutes = require('./src/routes/servicioRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');

const app = express();

app.use(cors({
    origin: [
        'http://localhost:4200',
        'https://beauty-manager-iota.vercel.app'
    ]
}));

app.use(express.json());

// Rutas de la API
app.use('/api/servicios', servicioRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Ruta de prueba: no necesita conectarse a SQL Server
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'BeautyManager API funcionando correctamente'
    });
});

// Ejecución local
if (require.main === module) {
    const PORT = process.env.PORT || 3000;

    async function iniciarServidor() {
        try {
            await conectarDB();

            app.listen(PORT, () => {
                console.log(
                    `BeautyManager API ejecutándose en puerto ${PORT}`
                );
            });
        } catch (error) {
            console.error(
                'No se pudo iniciar BeautyManager:',
                error.message
            );
            process.exit(1);
        }
    }

    iniciarServidor();
}

// Exportar Express para Vercel
module.exports = app;
