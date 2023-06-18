import { Developer, Game, Genre } from '../models';
import { GameCard } from '../components/GameCard';
// import games from '../assets/games.json'
import { useEffect, useState } from 'react';
import { DeveloperApi, GameApi, GenreApi } from '../services';

export const Homepage = () => {

    const [recentGames, setRecentGames] = useState<Game[]>([]);
    const [developers, setDevelopers] = useState<Developer[]>([]);
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedGames = await GameApi.retrieveAllGames();
                loadedGames.sort((a: Game, b: Game) => b.releaseDate.localeCompare(a.releaseDate));
                setRecentGames(loadedGames.slice(0, 4));
                setDevelopers(await DeveloperApi.retrieveAllDevelopers());
                setGenres(await GenreApi.retrieveAllGenres());
            }
            catch (error) {
                console.log("Games was not loaded");
            }
        }
        fetchData();
    }, []);


    // let gamesCopy: Game[] = games;
    // gamesCopy.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
    // let recentGames: Game[] = gamesCopy.slice(0, 4);



    return (
        <div className="flex flex-col h-full w-full p-8 bg-gray-100">
            <h1 className="text-4xl font-semibold mb-8 text-gray-700">Poslední vydané hry:</h1>
            <div className='flex flex-col md:flex-row justify-between items-stretch gap-6 mb-8'>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard developers={developers} game={recentGames[0]} genres={genres} />
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard developers={developers} game={recentGames[1]} genres={genres} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-stretch gap-6'>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard developers={developers} game={recentGames[2]} genres={genres} />
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard developers={developers} game={recentGames[3]} genres={genres} />
                    </div>
                </div>
            </div>
        </div>

    );
}
