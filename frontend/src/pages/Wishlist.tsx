import { Game } from '../models';
import { AiFillCloseCircle } from "react-icons/ai";
import reviews from '../assets/reviews.json';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { UserApi } from '../services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

interface WList {
    gameId: string,
    userId: string,
    game: Game,
}

export const WishList = () => {
    const { auth } = useAuth();

    const { data: wishListData } = useQuery<WList[]>(['users'], () => UserApi.getWishlist(auth.userId));
    const wishlistGames = wishListData?.map(wishlist => wishlist.game) ?? [];

    const queryClient = useQueryClient();

    const mutation = useMutation((game: Game) => UserApi.removeFromWishlist(auth.userId, game.id), {
        onError: (error) => {
            console.error('Failed to remove the game from wishlist:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });

    function removeGameFromWishlist(game: Game) {
        mutation.mutate(game);
    }

    const ratingBg = (rating: number) => rating > 7 ? '#ad0e30' : rating > 3 ? '#3690eb' : '#010203';

    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="w-full md:w-3/4">
                <h1 className="text-4xl m-6">WishList</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
                    {wishlistGames.map((game, index) => (
                        <div key={index} className="relative rounded overflow-hidden shadow-lg p-6 bg-white">
                            <AiFillCloseCircle className="absolute bottom-2 right-2 text-2xl cursor-pointer" onClick={() => removeGameFromWishlist(game)} />
                            <img className="w-full h-auto object-cover" src={game.cover} alt={game.name} />
                            <Link to={`/games/${game.id}`}>
                                <div className="font-bold text-xl text-center mt-4">{game.name}</div>
                            </Link>
                            <div className="flex justify-center px-6 py-4 min-w-0">
                                <div className="w-1/3 inline-block text-white rounded-full px-3 py-1 shadow-md mb-2 text-center" style={{ background: ratingBg(reviews.filter(rev => game.reviews.map(r => r.id).includes(rev.id)).reduce((ac, cur) => ac + cur.rating, 0)) }}>
                                    <p className="font-bold text-lg">{(reviews.filter(review => game.reviews.map(r => r.id).includes(review.id)).reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0) / game.reviews.length).toFixed(1)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}
