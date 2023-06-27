import { MouseEventHandler, useState } from 'react';
import { EditGame } from '../Editors/EditGame';
import { Developer, Game, Genre } from '../../models';
import { GameApi } from '../../services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteGameProps {
    handleClose: MouseEventHandler;
    gameId: string,
}

export const DeleteGameConfirm: React.FC<DeleteGameProps> = ({ handleClose, gameId }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(() => GameApi.remove(gameId), {
        onError: (error) => {
            console.error('Failed to delete the game:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['games']);
        },
    });

    const deleteGame = async (event: React.MouseEvent) => {
        mutation.mutate();
        handleClose(event);
    };

    return (
        <div className='border-2 border-black-1000'>
            <form className="p-6 bg-white rounded shadow-md">
                <p>Opravdu chcete smazat hru?</p>
                <div className="flex items-center justify-between mt-4">
                    <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" type="button" onClick={(event) => { deleteGame(event); }}  >Potvrdit</button>
                    <button className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleClose}>Storno</button>
                </div>
            </form>
        </div>
    );
};

interface GamesCRUDProps {
    games: Game[];
    developers: Developer[];
    genres: Genre[];
}

export const GamesCRUD: React.FC<GamesCRUDProps> = ({ developers, games, genres }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [editedGameId, setEditedGameId] = useState<string | null>(null);
    const [gameToDelete, setGameToDelete] = useState<string | null>(null);
    const [page, setPage] = useState(0);

    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(() => GameApi.add("Nová hra", "Popis", "2023-01-01", [], [], "", [], []), {
        onError: (error) => {
            console.error('Failed to add the game:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['games']);
        },
    });

    const addGame = () => {
        mutation.mutate();
    }

    const itemsPerPage = 5;

    const handleNextPage = () => {
        setPage(page + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className='flex justify-center'>
            <div className="p-6 space-y-4 w-full md:w-3/4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold">Hry</h1>
                    <button className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded-md" onClick={addGame}>Přidat hru</button>
                </div>
                <input
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    type="text"
                    placeholder="Hledat hry..."
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                {filteredGames.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(game => (
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
                                Upravit
                            </button>
                            <button className="w-auto px-4 py-2 text-white bg-red-500 rounded-md border-red-800" onClick={() => setGameToDelete(game.id)}>Smazat</button>
                            {gameToDelete === game.id && (
                                <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
                                    <DeleteGameConfirm handleClose={() => setGameToDelete(null)} gameId={game.id} />
                                </div>
                            )}
                        </div>
                        {editedGameId === game.id && (
                            <div className='mt-5'>
                                <EditGame gameProp={game} editedGameId={editedGameId} developers={developers} genres={genres} />
                            </div>
                        )}
                    </div>
                ))}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePreviousPage}
                        className={`px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${page === 0 && 'opacity-50 cursor-not-allowed'}`}
                        disabled={page === 0}
                    >
                        Předchozí
                    </button>
                    <button
                        onClick={handleNextPage}
                        className={`px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${filteredGames.length <= (page + 1) * itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
                        disabled={filteredGames.length <= (page + 1) * itemsPerPage}
                    >
                        Další
                    </button>
                </div>
            </div>
        </div>
    );
};
