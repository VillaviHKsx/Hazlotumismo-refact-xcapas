// Esta capa se encarga de manejar el acceso a nuestra fuente de datos (Archivos)
import fs from 'fs/promises';

const getPlayersFromDb = async () => {
    const players = await fs.readFile('./data/players.json');
    return JSON.parse(players);
}

const savePlayersToDB = async (players) => {
    await fs.writeFile('./data/players.json', JSON.stringify(players, null, 2));
};

export { getPlayersFromDb, savePlayersToDB };