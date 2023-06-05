import { Game } from '../models';
import games from '../assets/games.json';
import { GameCard } from '../components/GameCard';

export const Homepage = () => {
    let gamesCopy: Game[] = games;
    gamesCopy.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
    let recentGames: Game[] = gamesCopy.slice(0, 4);
    return (
        <div className="flex flex-col h-full w-full p-8 bg-gray-100">
            <h1 className="text-4xl font-semibold mb-8 text-gray-700">Poslední vydané hry:</h1>
            <div className='flex flex-col md:flex-row justify-between items-stretch gap-6 mb-8'>
                <div className="w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto">
                        <GameCard {...recentGames[0]} />
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto">
                        <GameCard {...recentGames[1]} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-stretch gap-6'>
                <div className="w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto h-full">
                        <GameCard {...recentGames[2]} />
                    </div>
                </div>
                <div className="w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto">
                        <GameCard {...recentGames[3]} />
                    </div>
                </div>
            </div>
        </div>
    );
}
