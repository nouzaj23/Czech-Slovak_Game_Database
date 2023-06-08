import { MouseEventHandler, useState } from 'react';
import gamesList from '../../assets/games.json';
import { EditGame } from '../Editors/EditGame';
import { Game } from '../../models';

interface DeleteGameProps {
    handleClose: MouseEventHandler;
    gameId: string,
    updateGames: Function,
    games: Game[],
}

export const DeleteGameConfirm: React.FC<DeleteGameProps> = ({ handleClose, gameId, updateGames, games }) => {
    const deleteGame = () => {
        updateGames(games.filter(game => game.id !== gameId));
    };

    return (
        <form className="p-6 bg-white rounded shadow-md">
            <p>Opravdu chcete smazat hru?</p>
            <div className="flex items-center justify-between mt-4">
                <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" type="button" onClick={(event) => { deleteGame(); handleClose(event); }}  >Potvrdit</button>
                <button className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleClose}>Storno</button>
            </div>
        </form>
    );
};

export const GamesCRUD = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [editedGameId, setEditedGameId] = useState<string | null>(null);
    const [gameToDelete, setGameToDelete] = useState<string | null>(null);
    const [games, setGames] = useState(gamesList);
    
    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addGame = () => {
        const newId = "noveId"; // backend udělá nové ID
        const newGame: Game = {comments: [], cover: "", description: "Nejvetsi kokotina", developers: [], genres: [], id: newId, name: "New Game", photos: [], releaseDate: "", reviews: [], videos: []}
        setGames([newGame, ...games])
    }

    return (
        <div className='flex justify-center'>
            <div className="p-6 space-y-4 w-3/4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold">Games</h1>
                    <button className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded-md" onClick={addGame}>Add new</button>
                </div>
                <input
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    type="text"
                    placeholder="Search games..."
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                {filteredGames.map(game => (
                    <div key={game.id} className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-semibold">{game.name}</h2>
                        <div className="mt-2 space-y-2">
                            <p>{game.description}</p>
                        </div>
                        <div className="mt-4 space-x-4">
                            <button
                                className="w-auto px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded-md"
                                onClick={() => setEditedGameId(editedGameId === game.id ? null : game.id)}
                            >
                                Edit
                            </button>
                            <button className="w-auto px-4 py-2 text-white bg-red-500 rounded-md" onClick={() => setGameToDelete(game.id)}>Delete</button>
                            {gameToDelete === game.id && (
                                <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
                                    <DeleteGameConfirm handleClose={() => setGameToDelete(null)} gameId={game.id} updateGames={setGames} games={games} />
                                </div>
                            )}
                        </div>
                        {editedGameId === game.id && (
                            <div className='mt-5'>
                                <EditGame gameProp={game} editedGameId={editedGameId} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
