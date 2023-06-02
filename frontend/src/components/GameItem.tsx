import { Game, Developer, Genre, Review } from '../models';

interface GameItemProps {
    game: Game;
    developers: Developer[];
    genres: Genre[];
    reviews: Review[];
}

export const GameItem: React.FC<GameItemProps> = ({ game, developers, genres, reviews }) => {
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

    let avgRating = 0;
    if (reviews.length > 0) {
        let totalRating = reviews.reduce((total, review) => total + review.rating, 0);
        avgRating = totalRating / reviews.length;
    }

    const ratingColor = avgRating >= 8 ? 'text-green-500'
                        : avgRating >= 6 ? 'text-yellow-500'
                        : 'text-red-500';

    return (
        <div className="rounded overflow-hidden shadow-lg flex flex-col transform transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105">
            <div className="w-full h-48 bg-gray-300 flex justify-center">
                <img className="w-2/3 h-full object-cover" src={game.cover} alt="Game cover" />
            </div>
            <div className="px-6 py-4 flex-grow">
                <div className="font-bold text-xl mb-2">{game.name}</div>
                <p className="text-gray-700 text-base">
                    {game.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <p className="text-gray-700 text-sm">
                    <b>Datum vydání:</b> {game.releaseDate}
                </p>
                <p className="text-gray-700 text-sm">
                    <b>Vývojáři:</b> {getDeveloperNames(game.developers)}
                </p>
                <p className="text-gray-700 text-sm">
                    <b>Žánry:</b> {getGenreNames(game.genres)}
                </p>
                <p className={`text-sm ${ratingColor}`}>
                    <b className='text-black'>Hodnocení:</b> {avgRating.toFixed(2)}
                </p>
            </div>
        </div>
    )
};
