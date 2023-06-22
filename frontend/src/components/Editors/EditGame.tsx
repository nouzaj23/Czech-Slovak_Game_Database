import { useState } from "react";
import { Developer, Game, Genre } from "../../models";
import { EditGameCover, EditGameDescription, EditGameDevelopers, EditGameGenres, EditGameName, EditGamePhotos, EditGameReleaseDate, EditGameVideos } from "./EditGameOperations";
import { GameApi } from "../../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditGameProps {
    gameProp: Game;
    editedGameId: string;
    developers: Developer[];
    genres: Genre[];
}

export const EditGame: React.FC<EditGameProps> = ({ gameProp, editedGameId, developers, genres }) => {
    const [game, setGame] = useState(gameProp);
    const queryClient = useQueryClient();

    const mutation = useMutation(() => GameApi.update(game.id, game.name, game.description, game.releaseDate, game.developers.map(d => d.id), game.genres.map(g => g.id), game.cover, game.photos, game.videos), {
        onError: (error) => {
            console.error('Failed to edit the game:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['games', game.id]);
        },
    });


    const updateGame = () => {
        mutation.mutate();
    };

    return (
        <div>
            {editedGameId === game.id && (
                <form className="bg-gray-200 p-6 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-black">Upravit hru</h3>
                    <div className="space-y-5">
                        <EditGameName game={game} updateGame={setGame} />
                        <EditGameDescription game={game} updateGame={setGame} />
                        <EditGameCover game={game} updateGame={setGame} />
                        <EditGameReleaseDate game={game} updateGame={setGame} />
                        <EditGamePhotos game={game} updateGame={setGame} />
                        <EditGameVideos game={game} updateGame={setGame} />
                        <EditGameGenres game={game} updateGame={setGame} genresList={genres} />
                        <EditGameDevelopers game={game} updateGame={setGame} developers={developers} />
                    </div>
                    <button
                        className="mt-4 px-4 py-2 text-white rounded-md bg-gray-600 hover:bg-gray-800 transition-colors duration-200"
                        type="submit" onClick={(event) => { event.preventDefault(); updateGame() }}
                    >
                        Uložit změny
                    </button>
                </form>
            )}
        </div>

    )
}