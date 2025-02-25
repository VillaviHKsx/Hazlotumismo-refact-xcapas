// En este archivo vamos a crear nuestro servicio http
// En este archivo se definen las configuraciones necesarias para el proyecto
// Vamos a hacer el llamado a la capa de ruteo
import express from 'express';
import toysRouter from './routes/toys.router.js';

const app = express();
app.use(express.json());

// Vamos a llamar a la capa de ruteo, al router que ocupemos definir
// Definimos la ruta raiz o base para acceder al recurso
app.use('/api/v1/toys', toysRouter);

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});