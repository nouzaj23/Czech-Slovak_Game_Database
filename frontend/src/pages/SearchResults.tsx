import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Developer, Game, Genre } from '../models';
import { useQuery } from '@tanstack/react-query';
import { DeveloperApi, GameApi, GenreApi } from '../services';

export const SearchResults = () => {
    const { query } = useParams();
    const [results, setResults] = useState<{ games: Game[]; developers: Developer[]; genres: Genre[] }>({ games: [], developers: [], genres: [] });

    if (!query) {
        return <div>404</div>;
    }

    useEffect(() => {
        const { data: gamesData } = useQuery<Game[]>(['games', query], () => GameApi.retrieveGamesByName(query));
        const games = gamesData ?? [];
        const { data: developersData } = useQuery<Developer[]>(['developers', query], () => DeveloperApi.retrieveDevelopersByName(query));
        const developers = developersData ?? [];
        const { data: genresData } = useQuery<Genre[]>(['genres', query], () => GenreApi.retrieveGenresByName(query));
        const genres = genresData ?? [];
        setResults({ games, developers, genres });
    }, [query]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Výsledky hledání pro "{query}"</h1>

            {results.games.length > 0 ? (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">Hry</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.games.map(game => (
                            <Link to={`/games/${game.id}`} key={game.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200" >
                                <div className='h-2/3'>
                                    <img src={game.cover} alt={game.name} className="h-48 object-cover rounded-md mb-5 m-auto" />
                                </div>
                                <div className=''>
                                    <h3 className="text-lg font-semibold mb-1">{game.name}</h3>
                                    <p className="text-gray-600 text-sm">{game.description.substring(0, 100)}...</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : null
            }

            {results.developers.length > 0 ? (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">Vývojáři</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.developers.map(developer => (
                            <Link to={`/developers/${developer.id}`} key={developer.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <div className='h-2/3'>
                                    <img src={developer.avatar} alt={developer.name} className="max-h-48 object-cover rounded-md mb-4 m-auto" />
                                </div>
                                <h3 className="text-lg font-semibold mb-1">{developer.name}</h3>
                                <p className="text-gray-600 text-sm">{developer.description.substring(0, 100)}...</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : null
            }

            {results.genres.length > 0 ? (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">Žánry</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.genres.map(genre => (
                            <Link to={`/games?genre=${genre.id}`} key={genre.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <h3 className="text-lg font-semibold mb-1">{genre.name}</h3>
                                <p className="text-gray-600 text-sm">{genre.description.substring(0, 100)}...</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : null
            }
        </div>
    );
};