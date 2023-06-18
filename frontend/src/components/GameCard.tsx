import { Developer, Game, Genre } from "../models";
// import developers from '../assets/developers.json';
// import genres from '../assets/genres.json';
// import reviews from '../assets/reviews.json';
import { Link } from "react-router-dom";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddToFavourite, RemoveFromFavourite } from './Authorized';
import { UserApi } from "../services";
import useAuth from "../hooks/useAuth";

interface GameCardProps {
    game: Game;
    developers: Developer[];
    genres: Genre[];
}

// type GameCardProps = Game;

export const GameCard: React.FC<GameCardProps> = ({ developers, game, genres }) => {
    const { auth } = useAuth();

    let gameDevelopers = developers.filter(developer => game.developers.includes(developer.id));
    let gameGenres = genres.filter(genre => game.genres.includes(genre.id));

    const rating: number = 10;

    // const rating: number = reviews.filter(review => game.reviews.includes(review.id)).reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0) / game.reviews.length;

    const ratingBg = () => {
        if (rating > 7) {
            return '#ad0e30';
        }
        else if (rating > 3) {
            return '#3690eb';
        }
        return '#010203';
    }

    const addToWishList = (gameId: string) => {
        UserApi.addToWishlist(auth.userId, gameId);
    }

    const removeFromWishList = (gameId: string) => {
        UserApi.removeFromWishlist(auth.userId, gameId);
    }

    return (
        <div className="p-6 relative" style={{ overflow: 'auto' }}>
            <img src={game.cover != undefined ? game.cover : ""} alt="popis" className="w-1/4 object-contain object-top float-left mr-4" />

            <div>
                <Link to={`/games/${game.id}`}>
                    <h2 className="pr-10 text-xl font-bold hover:underline">{game.name}</h2>
                </Link>
                <p className="pr-10 mt-2 text-gray-600"><b>Vývojáři:</b> {gameDevelopers.map((developer, index) => <Link to={`/developers/${developer.id}`} key={index} className="text-blue-500 hover:underline">{developer.name}{index !== gameDevelopers.length - 1 && ', '}</Link>)}</p>
                <p className="mt-2 text-gray-600"><b>Datum vydání:</b> {game.releaseDate}</p>
                <p className="mt-2 text-gray-600"><b>Žánry:</b> {gameGenres.map((genre, index) => <Link to={`/games?genre=${genre.id}`} key={index} className="text-blue-500 hover:underline">{genre.type}{index !== gameGenres.length - 1 && ', '}</Link>)}</p>
                <p className="mt-4 text-gray-700">
                    {game.description}
                </p>
            </div>
            <div className="absolute top-2 right-2 text-white rounded-full px-3 py-1 shadow-md" style={{ background: ratingBg() }}>
                <p className="font-bold text-lg">{rating.toFixed(1)}</p>
            </div>
            <div className="absolute top-12 right-4">
                <AddToFavourite id={game.id}>
                    <FontAwesomeIcon icon={faHeart} size='2x' className='text-red-500' onClick={() => addToWishList(game.id)}/>
                </AddToFavourite>
                <RemoveFromFavourite id={game.id}>
                    <FontAwesomeIcon icon={faHeart} size='2x' className='text-black-500' onClick={() => removeFromWishList(game.id)}/>
                </RemoveFromFavourite>
            </div>
        </div >
    )
}
