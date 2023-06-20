import { Game } from '../models';
import { GameCard } from '../components/GameCard';
import { GameApi } from '../services';
import { useQuery } from '@tanstack/react-query';

export const Homepage = () => {
    const { data: games } = useQuery<Game[]>(['games'], GameApi.retrieveAllGames);

    let recentGames: Game[] = [];

    if (games) {
        recentGames = [...games].sort((a, b) => {
            return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        }).slice(0, 4);
    }

    return (
        <div className="flex flex-col h-full w-full p-8 bg-gray-100">
            <h1 className="text-4xl font-semibold mb-8 text-gray-700">Poslední vydané hry:</h1>
            {recentGames.map((game, index) => (
                <div key={index} className='flex flex-col md:flex-row justify-between items-stretch gap-6 mb-8'>
                    <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                        <div className="flex-auto flex-grow">
                            <GameCard game={game}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
