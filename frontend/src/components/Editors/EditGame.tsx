//import { useState } from "react";
import { useState } from "react";
import { Game } from "../../models";
import { EditGameCover, EditGameDescribtion, EditGameDevelopers, EditGameGenres, EditGameName, EditGamePhotos, EditGameVideos } from "./EditGameOperations";

interface EditGameProps {
    gameProp: Game;
    editedGameId: string;
}

export const EditGame: React.FC<EditGameProps> = ({ gameProp, editedGameId }) => {
    const [game, setGame] = useState(gameProp);

    return (
        <div>
            {editedGameId === game.id && (
                <form className="bg-gray-200 p-6 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-black">Upravit hru</h3>
                    <div className="space-y-5">
                        <EditGameName game={game} updateGame={setGame}/>
                        <EditGameDescribtion game={game} updateGame={setGame}/>
                        <EditGameCover game={game} updateGame={setGame}/>
                        <EditGamePhotos game={game} updateGame={setGame}/>
                        <EditGameVideos game={game} updateGame={setGame}/>
                        <EditGameGenres game={game} updateGame={setGame} />
                        <EditGameDevelopers game={game} updateGame={setGame} />
                    </div>
                    <button
                        className="mt-4 px-4 py-2 text-white rounded-md bg-gray-600 hover:bg-gray-800 transition-colors duration-200"
                        type="submit" onClick={(event) => {event.preventDefault();}}
                    >
                        Uložit změny
                    </button>
                </form>
            )}
        </div>

    )
}