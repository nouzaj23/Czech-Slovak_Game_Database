import { Game } from '../models';
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { GameApi, UserApi } from '../services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';


export const WishList = () => {
    const { auth } = useAuth();

    const { data: wishListData } = useQuery<string[]>(['users'], () => UserApi.getWishlist(auth.userId));
    const wishlistGameIds: string[] = wishListData ?? [];

    const { data: gamesData } = useQuery<Game[]>(['games'], GameApi.retrieveAllGames);
    const games = gamesData ?? [];
    const wishlistGames = games.filter(game => wishlistGameIds.includes(game.id));

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

    const [page, setPage] = useState(0);
    const itemsPerPage = 3;

    const handleNextPage = () => {
        setPage(page + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    return (
        <div className="flex justify-center min-h-screen bg-gray-100">
            <div className="w-full md:w-3/4">
                <h1 className="text-4xl m-6">WishList</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-6">
                    {wishlistGames.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((game, index) => {
                        if (game)
                            return (
                                <div key={index} className="relative rounded overflow-hidden shadow-lg p-6 bg-white">
                                    <AiFillCloseCircle className="absolute bottom-2 right-2 text-2xl cursor-pointer" onClick={() => removeGameFromWishlist(game)} />
                                    <img className="w-full h-auto object-cover" src={game.cover} alt={game.name} />
                                    <Link to={`/games/${game.id}`}>
                                        <div className="font-bold text-xl text-center mt-4 hover:underline">{game.name}</div>
                                    </Link>
                                    <div className="flex justify-center px-6 py-4 min-w-0">
                                        <div className="w-1/3 inline-block text-white rounded-full px-3 py-1 shadow-md mb-2 text-center" style={{ background: ratingBg(game.rating) }}>
                                            <p className="font-bold text-lg">{game.rating}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                    })}
                </div>
                <div className="flex justify-between mt-4 pb-4">
                    <button
                        onClick={handlePreviousPage}
                        className={`px-4 py-2 ml-5 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${page === 0 && 'opacity-50 cursor-not-allowed'}`}
                        disabled={page === 0}
                    >
                        Předchozí
                    </button>
                    <button
                        onClick={handleNextPage}
                        className={`px-4 py-2 mr-5 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${wishlistGames.length <= (page + 1) * itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
                        disabled={wishlistGames.length <= (page + 1) * itemsPerPage}
                    >
                        Další
                    </button>
                </div>
            </div>
        </div>
    );

}
