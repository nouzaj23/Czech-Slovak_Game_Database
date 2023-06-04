import { Game } from "../models";
import developers from '../assets/developers.json';
import genres from '../assets/genres.json';
import reviews from '../assets/reviews.json';
import { Link } from "react-router-dom";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type GameCardProps = Game;

export const GameCard: React.FC<GameCardProps> = ({ ...game }) => {
    let gameDevelopers = developers.filter(developer => game.developers.includes(developer.id));
    let gameGenres = genres.filter(genre => game.genres.includes(genre.id));
    let gameReviews = reviews.filter(review => review.game === game.id);

    let avgRating = 0;
    if (gameReviews.length > 0) {
        let totalRating = gameReviews.reduce((total, review) => total + review.rating, 0);
        avgRating = totalRating / gameReviews.length;
    }

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

    return (
        <div>
            <div className="flex bg-white shadow-lg rounded-lg p-6 relative">
                <img src={game.cover} alt="popis" className="w-1/4 rounded-lg" />
                <div className="ml-4 w-3/4">
                    <h2 className="text-xl font-bold">{game.name}</h2>
                    <p className="mt-2 text-gray-600">Developers: {gameDevelopers.map((developer, index) => <Link to="" key={index} className="text-blue-500 hover:underline">{developer.name}{index !== gameDevelopers.length - 1 && ', '}</Link>)}</p>
                    <p className="mt-2 text-gray-600">Release Date: {game.releaseDate}</p>
                    <p className="mt-2 text-gray-600">Genres: {gameGenres.map((genre, index) => <Link to="" key={index} className="text-blue-500 hover:underline">{genre.type}{index !== gameGenres.length - 1 && ', '}</Link>)}</p>
                    <p className="mt-4 text-gray-700">
                        {game.description}
                    </p>
                </div>
                <div className="absolute top-2 right-2 text-white rounded-full px-3 py-1 shadow-md" style={{ background: ratingBg() }}>
                    <p className="font-bold text-lg">{rating.toFixed(1)}</p>
                </div>
                <div className="absolute top-12 right-4">
                    <FontAwesomeIcon icon={faHeart} size='2x' className='text-red-500' />
                </div>
            </div>
        </div>
    )
}
