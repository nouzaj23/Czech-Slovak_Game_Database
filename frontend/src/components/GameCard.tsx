import { Game } from "../models";
import { Link } from "react-router-dom";
import { WishListOperations } from "./WishListOperations";

interface GameCardProps {
    game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {

    if (!game) {
        return <div>Chyba v načítání hry</div>;
    }

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
        <div className="p-6 relative" style={{ overflow: 'auto' }}>
            <img src={game.cover != undefined ? game.cover : ""} alt="Obálka hry" className="w-1/4 object-contain object-top float-left mr-4" />

            <div>
                <Link to={`/games/${game.id}`}>
                    <h2 className="pr-10 text-xl font-bold hover:underline">{game.name}</h2>
                </Link>
                <p className="pr-10 mt-2 text-gray-600"><b>Vývojáři:</b> {game.developers?.map((developer, index) => <Link to={`/developers/${developer.id}`} key={index} className="text-blue-500 hover:underline">{developer.name}{index !== game.developers.length - 1 && ', '}</Link>)}</p>
                <p className="mt-2 text-gray-600"><b>Datum vydání:</b> {new Date(game.releaseDate).toISOString().slice(0,10)}</p>
                <p className="mt-2 text-gray-600"><b>Žánry:</b> {game.genres?.map((genre, index) => <Link to={`/games?genre=${genre.id}`} key={index} className="text-blue-500 hover:underline">{genre.name}{index !== game.genres.length - 1 && ', '}</Link>)}</p>
                <p className="mt-4 text-gray-700">
                    {game.description}
                </p>
            </div>
            <div className="absolute top-2 right-2 text-white rounded-full px-3 py-1 shadow-md" style={{ background: ratingBg() }}>
                <p className="font-bold text-lg">{game.rating?.toFixed(1)}</p>
            </div>
            <div className="absolute top-12 right-4">
                <WishListOperations gameId={game.id} />
            </div>
        </div >
    )
}
