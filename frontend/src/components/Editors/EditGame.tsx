import { useCallback, useState } from "react";
import { Developer, Game, Genre } from "../../models";
import { EditGameCover, EditGameDescribtion, EditGameDevelopers, EditGameGenres, EditGameName, EditGamePhotos, EditGameVideos } from "./EditGameOperations";
import { GameApi } from "../../services";

interface EditGameProps {
    gameProp: Game;
    editedGameId: string;
    developers: Developer[];
    genres: Genre[];
}

export const EditGame: React.FC<EditGameProps> = ({ gameProp, editedGameId, developers, genres }) => {
    const [game, setGame] = useState(gameProp);

    // const updateGame = async () => {
    //     try {
    //         await GameApi.update(game.id, game.name, game.description, game.releaseDate, game.developers, game.genres, game.cover, game.photos, game.videos);
    //     } catch (error) {
    //         console.error('Failed to update the game:', error);
    //     }
    // }

    const updateGame = useCallback(async () => {
        try {
            const developersIds = game.developers.map(developer => developer.id);
            const genresIds = game.genres.map(genre => genre.id);
            await GameApi.update(game.id, game.name, game.description, game.releaseDate, developersIds, genresIds, game.cover, game.photos, game.videos);
        } catch (error) {
            console.error('Failed to update the game:', error);
        }
    }, [game]);

    return (
        <div>
            {editedGameId === game.id && (
                <form className="bg-gray-200 p-6 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-black">Upravit hru</h3>
                    <div className="space-y-5">
                        <EditGameName game={game} updateGame={setGame} />
                        <EditGameDescribtion game={game} updateGame={setGame} />
                        <EditGameCover game={game} updateGame={setGame} />
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