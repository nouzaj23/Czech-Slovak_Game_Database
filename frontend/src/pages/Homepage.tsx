import { Game } from '../models';
import { GameCard } from '../components/GameCard';
import { useEffect, useState } from 'react';
import { GameApi } from '../services';

export const Homepage = () => {

    const [recentGames, setRecentGames] = useState<Game[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const loadedGames = await GameApi.retrieveAllGames();
                loadedGames.sort((a: Game, b: Game) => b.releaseDate.localeCompare(a.releaseDate));
                setRecentGames(loadedGames.slice(0, 4));
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
                        <GameCard {...recentGames[0]} />
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard {...recentGames[1]} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-stretch gap-6'>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard {...recentGames[2]} />
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard {...recentGames[3]} />
                    </div>
                </div>
            </div>
        </div>

    );
}
