import { useState } from "react";
import { GamesCRUD } from "../components/CRUD/GamesCRUD";
import { DevelopersCRUD } from "../components/CRUD/DevelopersCRUD";
import { UsersCRUD } from "../components/CRUD/UsersCRUD";
import { GenresCRUD } from "../components/CRUD/GenresCRUD";
import { Developer, Game, Genre, User } from "../models";
import { DeveloperApi, GameApi, GenreApi, UserApi } from "../services";
import { useQuery } from "@tanstack/react-query";

export const AdminPage = () => {
    const [visibleComponent, setVisibleComponent] = useState('');

    const { data: gamesData } = useQuery<Game[]>(['games'], GameApi.retrieveAllGames);
    const { data: developersData } = useQuery<Developer[]>(['developers'], DeveloperApi.retrieveAllDevelopers);
    const { data: genresData } = useQuery<Genre[]>(['genres'], GenreApi.retrieveAllGenres);
    const { data: usersData } = useQuery<User[]>(['users'], UserApi.retrieveAllUsers);

    const games = gamesData ?? [];
    const developers = developersData ?? [];
    const genres = genresData ?? [];
    const users = usersData ?? [];

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
                    Vývojáři
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

            {visibleComponent === 'Games' ? <GamesCRUD developers={developers} games={games} genres={genres} /> : null}
            {visibleComponent === 'Developers' ? <DevelopersCRUD developers={developers} /> : null}
            {visibleComponent === 'Users' ? <UsersCRUD users={users} /> : null}
            {visibleComponent === 'Genres' ? <GenresCRUD genres={genres} /> : null}
        </div>
    );
}
