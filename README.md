
# BeautyManager

## Sistema de administración de peluquería

BeautyManager es un sistema de administración desarrollado para gestionar la información de una peluquería y alimentar su sistema Core.

## Tecnologías utilizadas

### Frontend
- Angular
- TypeScript
- HTML
- SCSS

### Backend
- Node.js
- Express.js
- Sequelize

### Base de datos
- Microsoft SQL Server
- Base de datos: BeautyManagerDB

## Funcionalidades

- Gestión de clientes.
- Gestión de servicios.
- Gestión de usuarios.
- Validaciones en el backend.
- Asociación de clientes con usuarios mediante listas desplegables.

## Estructura del proyecto

```text
BeautyManager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── server.js
│
├── frontend/
│   └── src/
│       └── app/
│           ├── pages/
│           └── services/
│
└── README.md
```

## Ejecución del proyecto

### Backend

```bash
cd backend
npm install
node server.js
```

### Frontend

```bash
cd frontend
npm install
npm start
```

Frontend: http://localhost:4200

Backend: http://localhost:3000

## Base de datos

El sistema utiliza SQL Server y la base de datos BeautyManagerDB.

Configurar las credenciales de conexión en el archivo de entorno correspondiente.

## Autor

Proyecto académico - Ingeniería de Software.
