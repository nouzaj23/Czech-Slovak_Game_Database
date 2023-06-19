import { useEffect, useState } from "react";
import { GamesCRUD } from "../components/CRUD/GamesCRUD";
import { DevelopersCRUD } from "../components/CRUD/DevelopersCRUD";
import { UsersCRUD } from "../components/CRUD/UsersCRUD";
import { GenresCRUD } from "../components/CRUD/GenresCRUD";
import { Developer, Game, Genre } from "../models";
import { DeveloperApi, GameApi, GenreApi } from "../services";

export const AdminPage = () => {
    const [visibleComponent, setVisibleComponent] = useState('');

    const [games, setGames] = useState<Game[]>([]);
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setGames(await GameApi.retrieveAllGames());
                setDevelopers(await DeveloperApi.retrieveAllDevelopers());
                setGenres(await GenreApi.retrieveAllGenres());
            }
            catch (error) {
                console.log("Games was not loaded");
            }
        }
        fetchData();
    }, []);

    return (
        <div className="p-6 max-w-screen overflow-x-hidden">
            <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
                <button
                    className="w-full p-4 text-white bg-gray-800 rounded-md"
                    onClick={() => setVisibleComponent('Games')}
                >
                    Hry
                </button>
                <button
                    className="w-full p-4 text-white bg-gray-800 rounded-md"
                    onClick={() => setVisibleComponent('Developers')}
                >
                    Studia
                </button>
                <button
                    className="w-full p-4 text-white bg-gray-800 rounded-md"
                    onClick={() => setVisibleComponent('Users')}
                >
                    Uživatelé
                </button>
                <button
                    className="w-full p-4 text-white bg-gray-800 rounded-md"
                    onClick={() => setVisibleComponent('Genres')}
                >
                    Žánry
                </button>
            </div>

            {visibleComponent === 'Games' ? <GamesCRUD developers={developers} games={games} genres={genres} setGames={setGames}/> : null}
            {visibleComponent === 'Developers' ? <DevelopersCRUD developers={developers} setDevelopers={setDevelopers}/> : null}
            {visibleComponent === 'Users' ? <UsersCRUD /> : null}
            {visibleComponent === 'Genres' ? <GenresCRUD genres={genres} setGenres={setGenres}/> : null}
        </div>
    );
}
