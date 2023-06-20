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

    const { data: gamesData } = useQuery<Game[]>(['gamesAdminPage'], GameApi.retrieveAllGames);
    const { data: developersData } = useQuery<Developer[]>(['developersAdminPage'], DeveloperApi.retrieveAllDevelopers);
    const { data: genresData } = useQuery<Genre[]>(['genresAdminPage'], GenreApi.retrieveAllGenres);
    const { data: usersData } = useQuery<User[]>(['usersAdminPage'], UserApi.retrieveAllUsers);

    const [games, setGames] = useState<Game[]>(gamesData ?? []);
    const [developers, setDevelopers] = useState<Developer[]>(developersData ?? []);
    const [genres, setGenres] = useState<Genre[]>(genresData ?? []);
    const [users, setUsers] = useState<User[]>(usersData ?? []);

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
            {visibleComponent === 'Users' ? <UsersCRUD users={users} setUsers={setUsers}/> : null}
            {visibleComponent === 'Genres' ? <GenresCRUD genres={genres} setGenres={setGenres}/> : null}
        </div>
    );
}
