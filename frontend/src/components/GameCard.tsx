import { Game } from "../models";
import developers from '../assets/developers.json';
import genres from '../assets/genres.json';
import reviews from '../assets/reviews.json';
import { Link } from "react-router-dom";

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

    const ratingColor = avgRating >= 8 ? 'text-green-500'
        : avgRating >= 6 ? 'text-yellow-500'
            : 'text-red-500';

    return (
        <div className='flex flex-col w-1/2 h-full bg-white border-2 border-black rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out p-4 m-4'>
            <div className='flex flex-row'>
                <div className='inline-flex w-1/3'>
                    <img src={game.cover} className='mx-auto my-2 object-cover rounded-md shadow-md' alt={game.name} />
                </div>
                <div className='flex flex-col w-auto pt-3 gap-1 pl-4'>
                    <Link to={`games/${game.id}`}>
                        <h1 className='text-2xl font-bold text-gray-700'>{game.name}</h1>
                    </Link>
                    <div className='text-gray-500'>
                        {gameDevelopers.map((developer, index) => {
                            return (
                                <span key={index} className='text-lg font-medium'>{developer.name}</span>
                            );
                        })}
                    </div>
                    <h2 className='text-lg text-gray-600'>{game.releaseDate}</h2>
                    <div className='text-gray-500'>
                        {gameGenres.map((genre, index) => {
                            return (
                                <span key={index} className='text-base'>{genre.type}</span>
                            );
                        })}
                    </div>
                    {/* Display the average rating with color */}
                    <div className={`text-base ${ratingColor}` + ' mb-2'}>{avgRating.toFixed(2)}</div>
                </div>
            </div>
            <p className='text-base text-gray-700'>{game.description}</p>
        </div>
    )
}
