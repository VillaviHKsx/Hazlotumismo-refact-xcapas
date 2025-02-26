// Esta capa se encarga de la definición de nuestras servicios
// El tipo de verbo http, la ruta y aplicación de middlawres en caso de necesitar
// Debemos utilizar Router de express
import express from 'express';
import { getAllPlayers, getToyById, updateToy, deleteToy, createPlayer } from '../controllers/players.controller.js';

const router = express.Router();

router.get('/', getAllPlayers);
router.post('/', createPlayer);
//router.get('/:id', getToyById);
//router.patch('/:id', updateToy);
//router.delete('/:id', deleteToy);

export default router;