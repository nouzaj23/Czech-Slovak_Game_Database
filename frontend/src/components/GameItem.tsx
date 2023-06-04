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
    const getDeveloperNames = (developerIds: string[]) => {
        return developerIds.map(id => {
            const developer = developers.find(dev => dev.id === id);
            return developer ? developer.name : '';
        }).join(', ');
    };

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

    const getGenreNames = (genreIds: string[]) => {
        return genreIds.map(id => {
            const genre = genres.find(gen => gen.id === id);
            return genre ? genre.type : '';
        }).join(', ');
    };

    // let avgRating = 0;
    // if (reviews.length > 0) {
    //     let totalRating = reviews.reduce((total, review) => total + review.rating, 0);
    //     avgRating = totalRating / reviews.length;
    // }

    return (
        <div className="rounded overflow-hidden shadow-lg flex flex-col transform transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105">
            <div className="w-full h-48 bg-gray-300 flex justify-center">
                <img className="w-2/3 h-full object-cover" src={game.cover} alt="Game cover" />
            </div>
            <div className="px-6 py-4 flex-grow">
                <Link to={`games/${game.id}`}>
                    <div className="font-bold text-xl mb-2">{game.name}</div>
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
                        <b>Vývojáři:</b> {getDeveloperNames(game.developers)}
                    </p>
                    <p className="text-gray-700 text-sm">
                        <b>Žánry:</b> {getGenreNames(game.genres)}
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
