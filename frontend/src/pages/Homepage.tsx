import { Game } from '../models';
import { GameCard } from '../components/GameCard';
import { useEffect } from 'react';
import { GameApi } from '../services';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { gamesAtom } from '../state/atoms';
import { useQuery } from '@tanstack/react-query';
import { recentGamesSelector } from '../state/selectors';

export const Homepage = () => {
    const setGames = useSetRecoilState(gamesAtom)
    const { data: games } = useQuery<Game[]>(['games'], GameApi.retrieveAllGames);

    useEffect(() => {
        if (games) {
            setGames(games);
        }
    }, [games, setGames]);

    const recentGames = useRecoilValue(recentGamesSelector);

    return (
        <div className="flex flex-col h-full w-full p-8 bg-gray-100">
            <h1 className="text-4xl font-semibold mb-8 text-gray-700">Poslední vydané hry:</h1>
            <div className='flex flex-col md:flex-row justify-between items-stretch gap-6 mb-8'>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard game={recentGames[0]}/>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard game={recentGames[1]}/>
                    </div>
                </div>
            </div>
            <div className='flex flex-col md:flex-row justify-between items-stretch gap-6'>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard game={recentGames[2]}/>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/2 p-4 bg-white shadow rounded">
                    <div className="flex-auto flex-grow">
                        <GameCard game={recentGames[3]}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
