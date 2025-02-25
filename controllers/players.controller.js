// Esta capa se encarga de manejar el request que llega del cliente y darle ua respuesta
// En el acaso de que necesitemos podemos hacer validaciones
import { getToyById as getToyByIdService, getPlayers, saveToy, updateToy as updateToyService, deleteToy as deleteToyService} from '../services/players.service.js';
import { toySchema, toyUpdateSchema } from '../schemas/players.schema.js';
import { getPlayersFromDb } from '../repositories/players.repository.js';
//import { object } from 'joi';

const getAllPlayers = async (req, res) => {
    try {
        const players = await getPlayers();
        res.json(players);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los juguetes'});
    }
};

const createToy = async (req, res) => {
    try{ 
        const {error} = toySchema.validate(req.body, { convert: false});
        if (error){
            return res.status(400).json({ error: error.details[0].message });
        }
        // Vamos a llamar a la capa de servicios
        await saveToy(req.body);
        res.status(201).json({ message: 'Juguete creado con exito'});
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el juguete'});
    }
};

const getToyById = async (req, res) => {
    try {
        const toy = await getToyByIdService(req.params.id);      
        if (!toy) {
            return res.status(404).json({ message: 'Juguete no encontrado'});
        }
        res.json(toy);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el juguete'});
    }
};

// Vamos actualizar el juguete
const updateToy = async (req, res) => {
    try{
        //Validaciones Controllers
    const {error} = toyUpdateSchema.validate(req.body, { convert: false});
    if (error){
        return res.status(400).json({ error: error.details[0].message });
    }

    const { id } = req.params;

    //Llamado a la capa de servicios
    const updateToyResult = await updateToyService(id, req.body);

    //Capa de controllers
    if (!updateToyResult) {
        return res.status(404).json({ message: 'Juguete no encontrado'});
    }

    //Capa de controllers
    res.json({ message: 'Juguete actualizado con exito'});
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el juguete'});

    }
};

const deleteToy = async (req, res) => {
    try {
        const id = req.params.id;
        const toyDeleted = await deleteToyService(id); //Esta variable almacena si el juguete se elimino (true) o no (false)

        //Capa de controllers (validacion y dar una respuesta)
        if (!toyDeleted) {
            return res.status(404).json({ status: 'fail', message: 'Juguete no encontrado'});
        }

        res.end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al eliminar el juguete'});
    }
}

export { getAllPlayers, createToy, getToyById, updateToy, deleteToy };