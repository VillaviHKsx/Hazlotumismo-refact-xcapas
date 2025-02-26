// Esta capa se encarga de manejar de manejar toda la logica de nuestra aplicacion
// Es lac capa mas importante de nuestra aplicacion
import { getPlayersFromDb, savePlayersToDB } from '../repositories/players.repository.js';
import { v4 as uuidv4 } from 'uuid';

const getPlayers = async () => {
    const players = await getPlayersFromDb();
    return players;
};

const savePlayer = async (playerToSave) => {
    //Logica de negocio
    const uuid = uuidv4();
    //Llamado a la capa de repositorio
    const players = await getPlayersFromDb();
    //Logica de negocio   
    players.push({id: uuid, ...playerToSave});
   //Llamado a la capa de repositorio
    await savePlayersToDB(players);
};

const getPlayerById = async (id) => {
    const players = await getPlayers();
    const player = players.find(player => player.id === id);
    return player;
};

const updatePlayer = async (id, data) => {
    //Llamada a la capa de repositorios
    const players = await getPlayersFromDb();
    //Logica de negocio
    const playerIndex = players.findIndex((player) => player.id === id);

    if (playerIndex === -1) return null;

     //Logica del nogocio (capa de servicios)
     const playerToUpdate = players[playerIndex];
     Object.assign(playerToUpdate, data);
     players[playerIndex] = playerToUpdate;
 
     //Capa de repositorios
     await savePlayersToDB(players);
     return playerToUpdate;
};


const deleteToy = async (id) => {
    //Llamada a la capa de repositorios
    const toys = await getPlayersFromDb();
    //Logica de negocio
    const toyIndex = toys.findIndex((toy) => toy.id === id);

    if (toyIndex === -1) return false;

    //Logica de negocio
    toys.splice(toyIndex, 1);

    //Capa de repositorios
    await savePlayersToDB(players);
    return true;
};

export { getPlayers, savePlayer, getPlayerById, updatePlayer, deleteToy };