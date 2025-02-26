// Esta capa se encarga de la definición de nuestras servicios
// El tipo de verbo http, la ruta y aplicación de middlawres en caso de necesitar
// Debemos utilizar Router de express
import express from 'express';
import { getAllPlayers, createPlayer, getPlayerById, updatePlayer, deleteToy } from '../controllers/players.controller.js';

const router = express.Router();

router.get('/', getAllPlayers);
router.post('/', createPlayer);
router.get('/:id', getPlayerById);
router.patch('/:id', updatePlayer);
//router.delete('/:id', deleteToy);

export default router;