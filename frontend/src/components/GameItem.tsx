import { Game, Developer, Genre } from '../models'

interface GameItemProps {
    game: Game;
    developers: Developer[];
    genres: Genre[];
}

export const GameItem: React.FC<GameItemProps> = ({ game, developers, genres }) => {
    const getDeveloperNames = (developerIds: string[]) => {
        return developerIds.map(id => {
            const developer = developers.find(dev => dev.id === id);
            return developer ? developer.name : '';
        }).join(', ');
    };

    const getGenreNames = (genreIds: string[]) => {
        return genreIds.map(id => {
            const genre = genres.find(gen => gen.id === id);
            return genre ? genre.type : '';
        }).join(', ');
    };

    return (
        <div
            className="rounded overflow-hidden shadow-lg flex flex-col transform transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105"
        >
            <div className="w-full h-48 bg-gray-300 flex justify-center">
                <img
                    className="w-2/3 h-full object-cover"
                    src={game.cover}
                    alt="Game cover"
                />
            </div>
            <div className="px-6 py-4 flex-grow">
                <div className="font-bold text-xl mb-2">{game.name}</div>
                <p className="text-gray-700 text-base">
                    {game.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <p className="text-gray-700 text-sm">
                    Release Date: {game.releaseDate}
                </p>
                <p className="text-gray-700 text-sm">
                    Developers: {getDeveloperNames(game.developers)}
                </p>
                <p className="text-gray-700 text-sm">
                    Genres: {getGenreNames(game.genres)}
                </p>
            </div>
        </div>
    )
};
