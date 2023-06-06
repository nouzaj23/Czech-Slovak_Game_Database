import { Game } from '../models';
import games from '../assets/games.json';
import { User } from '../models/user';
import users from '../assets/users.json'
import { AiFillCloseCircle } from "react-icons/ai";
import reviews from '../assets/reviews.json';
import { Link } from 'react-router-dom';



export const WishList = () => {
    const currentUser: User = users[0];

    const gamesInWishlist: Game[] = games.filter(game => currentUser.wishlist.includes(game.id));

    function removeGameFromWishlist(index: number) {
        if (index == 0) {

        }
    }

    const ratingBg = (rating: number) => rating > 7 ? '#ad0e30' : rating > 3 ? '#3690eb' : '#010203';

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="w-full md:w-3/4">
                <h1 className="text-4xl m-6">WishList</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
                    {gamesInWishlist.map((game, index) => (
                        <div key={index} className="relative rounded overflow-hidden shadow-lg p-6 bg-white">
                            <AiFillCloseCircle className="absolute bottom-2 right-2 text-2xl cursor-pointer" onClick={() => removeGameFromWishlist(index)} />
                            <img className="w-full h-auto object-cover" src={game.cover} alt={game.name} />
                            <div className="px-6 py-4 min-w-0">
                                <Link to={`/games/${game.id}`}>
                                    <div className="font-bold text-xl mb-7">{game.name}</div>
                                </Link>
                            </div>
                            <div className="absolute bottom-2 left-11 inline-block text-white rounded-full px-3 py-1 shadow-md" style={{ background: ratingBg(reviews.filter(rev => game.reviews.includes(rev.id)).reduce((ac, cur) => ac + cur.rating, 0)) }}>
                                <p className="font-bold text-lg">{(reviews.filter(review => game.reviews.includes(review.id)).reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0) / game.reviews.length).toFixed(1)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
