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
            <div className='flex flex-row justify-between items-center gap-6 mb-8'>
                <GameCard {...recentGames[0]} />
                <GameCard {...recentGames[1]} />
            </div>
            <div className='flex flex-row justify-between items-center gap-6'>
                <GameCard {...recentGames[2]} />
                <GameCard {...recentGames[3]} />
            </div>
        </div>
    );
}
