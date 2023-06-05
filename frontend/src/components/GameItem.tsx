import { Game, Developer, Genre, Review } from '../models';
import { Link } from 'react-router-dom';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface GameItemProps {
    game: Game;
    developers: Developer[];
    genres: Genre[];
    reviews: Review[];
}

export const GameItem: React.FC<GameItemProps> = ({ game, developers, genres, reviews }) => {
    const gameDevelopers = developers.filter(developer => game.developers.includes(developer.id));
    const gameGenres = genres.filter(genre => game.genres.includes(genre.id));

    const rating: number = reviews.filter(review => game.reviews.includes(review.id)).reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0) / game.reviews.length;

    const ratingBg = () => {
        if (rating > 7) {
            return '#ad0e30';
        }
        else if (rating > 3) {
            return '#3690eb';
        }
        return '#010203';
    }

    // let avgRating = 0;
    // if (reviews.length > 0) {
    //     let totalRating = reviews.reduce((total, review) => total + review.rating, 0);
    //     avgRating = totalRating / reviews.length;
    // }

    return (
        <div className="rounded overflow-hidden shadow-lg flex flex-col transform transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105">
            <div className="w-full h-48 bg-gray-300 flex justify-center border-b-2 border-black">
                <img className="object-cover max-h-full" src={game.cover} alt="Game cover" />
            </div>
            <div className="px-6 py-4 flex-grow">
                <Link to={`/games/${game.id}`}>
                    <div className="font-bold text-xl mb-2 hover:underline">{game.name}</div>
                </Link>
                <p className="text-gray-700 text-base">
                    {game.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex items-center">
                <div className="flex-grow">
                    <p className="text-gray-700 text-sm">
                        <b>Datum vydání:</b> {game.releaseDate}
                    </p>
                    <p className="text-gray-700 text-sm">
                        <b>Vývojáři:</b> {gameDevelopers.map((developer, index) => <Link to={`/developers/${developer.id}`} key={index} className="text-blue-500 hover:underline">{developer.name}{index !== gameDevelopers.length - 1 && ', '}</Link>)}
                    </p>
                    <p className="text-gray-700 text-sm">
                        <b>Žánry:</b> {gameGenres.map((genre, index) => <Link reloadDocument to={`/games?genre=${genre.id}`} key={index} className="text-blue-500 hover:underline">{genre.type}{index !== gameGenres.length - 1 && ', '}</Link>)}
                    </p>
                </div>
                <div className="flex items-center">
                    <div>
                        <FontAwesomeIcon icon={faHeart} size='2x' className='text-red-500' />
                    </div>
                    <div className="ml-2 text-white rounded-full px-3 py-1 shadow-md" style={{ background: ratingBg() }}>
                        <p className="font-bold text-lg">{rating.toFixed(1)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
