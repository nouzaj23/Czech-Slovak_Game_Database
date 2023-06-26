import { Link, useParams } from 'react-router-dom';
import { Developer, Game, Genre } from '../models';
import { useQuery } from '@tanstack/react-query';
import { DeveloperApi, GameApi, GenreApi } from '../services';

export const SearchResults = () => {
    const { query } = useParams();

    if (!query) {
        return <div>404</div>;
    }

    const { data: gamesData } = useQuery<Game[]>(['games', query], () => GameApi.retrieveGamesByName(query), {
        enabled: !!query,
    });
    const { data: developersData } = useQuery<Developer[]>(['developers', query], () => DeveloperApi.retrieveDevelopersByName(query), {
        enabled: !!query,
    });
    const { data: genresData } = useQuery<Genre[]>(['genres', query], () => GenreApi.retrieveGenresByName(query), {
        enabled: !!query,
    });

    const games = gamesData ?? [];
    const developers = developersData ?? [];
    const genres = genresData ?? [];

    if (!query) {
        return <div>404</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Výsledky hledání pro "<b>{query}</b>"</h1>

            {games.length > 0 ? (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">Hry</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {games.map(game => (
                            <Link to={`/games/${game.id}`} key={game.id} className="flex flex-col p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200 h-auto" >
                                <img src={game.cover} alt={game.name} className="max-h-48 object-fill rounded-md m-auto" />
                                <h3 className="text-lg font-semibold mb-1">{game.name}</h3>
                                <p className="text-gray-600 text-sm">{game.description.length > 100 ? `${game.description.substring(0, 100)}...` : game.description} </p>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : null
            }

            {developers.length > 0 ? (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">Vývojáři</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {developers.map(developer => (
                            <Link to={`/developers/${developer.id}`} key={developer.id} className="flex flex-col p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200 h-auto">
                                <img src={developer.avatar} alt={developer.name} className="max-h-48 object-fill rounded-md m-auto" />
                                <h3 className="text-lg font-semibold mb-1">{developer.name}</h3>
                                <p className="text-gray-600 text-sm">{developer.description.length > 100 ? `${developer.description.substring(0, 100)}...` : developer.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : null
            }

            {genres.length > 0 ? (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-2">Žánry</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {genres.map(genre => (
                            <Link to={`/games?genre=${genre.id}`} key={genre.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-200 h-auto">
                                <h3 className="text-lg font-semibold mb-1">{genre.name}</h3>
                                <p className="text-gray-600 text-sm">{genre.description.length > 100 ? `${genre.description.substring(0, 100)}...` : genre.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ) : null
            }
        </div>
    );
};