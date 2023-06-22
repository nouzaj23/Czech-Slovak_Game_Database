import { Game } from '../models';
import { Link } from 'react-router-dom';
import { WishListOperations } from './WishListOperations';

interface GameItemProps {
    game: Game;
}

export const GameItem: React.FC<GameItemProps> = ({ game }) => {

    const ratingBg = () => {
        if (game.rating > 7) {
            return '#ad0e30';
        }
        else if (game.rating > 3) {
            return '#3690eb';
        }
        return '#010203';
    }

    return (
        <div className="rounded overflow-hidden shadow-lg flex flex-col transform transition duration-500 ease-in-out hover:shadow-2xl hover:scale-105">
            <div className="w-full h-48 bg-gray-300 flex justify-center border-b-2 border-black">
                <img className="object-fill max-h-full" src={game.cover} alt="Game cover" />
            </div>
            <div className="px-6 py-4 flex-grow">
                <Link to={`/games/${game.id}`}>
                    <div className="font-bold text-xl mb-2 hover:underline">{game.name}</div>
                </Link>
                <p className="text-gray-700 text-base">
                    {game.description.length > 100 ? `${game.description.substring(0, 100)}...` : game.description}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2 flex items-center">
                <div className="flex-grow">
                    <p className="text-gray-700 text-sm">
                        <b>Datum vydání:</b> {new Date(game.releaseDate).toISOString().slice(0, 10)}
                    </p>
                    <p className="text-gray-700 text-sm">
                        <b>Vývojáři:</b> {game.developers.map((developer, index) => <Link to={`/developers/${developer.id}`} key={index} className="text-blue-500 hover:underline">{developer.name}{index !== game.developers.length - 1 && ', '}</Link>)}
                    </p>
                    <p className="text-gray-700 text-sm">
                        <b>Žánry:</b> {game.genres.map((genre, index) => <Link reloadDocument to={`/games?genre=${genre.id}`} key={index} className="text-blue-500 hover:underline">{genre.name}{index !== game.genres.length - 1 && ', '}</Link>)}
                    </p>
                </div>
                <div className="flex items-center">
                    <div>
                        <WishListOperations gameId={game.id} />
                    </div>
                    <div className="ml-2 text-white rounded-full px-3 py-1 shadow-md" style={{ background: ratingBg() }}>
                        <p className="font-bold text-lg">{game.rating?.toFixed(1)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
