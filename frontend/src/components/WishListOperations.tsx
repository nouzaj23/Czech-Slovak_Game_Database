import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddToFavourite, RemoveFromFavourite } from "./Authorized";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserApi } from "../services";

interface WishListOperationsProps {
    gameId: string,
}

export const WishListOperations: React.FC<WishListOperationsProps> = ({gameId}) => {
    const { auth } = useAuth();

    const queryClient = useQueryClient();

    const mutationAddToWishList = useMutation(() => UserApi.addToWishlist(auth.userId, gameId), {
        onError: (error) => {
            console.error('Cannot add to wishlist:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });
    
    const mutationRemoveFromWishList = useMutation(() => UserApi.removeFromWishlist(auth.userId, gameId), {
        onError: (error) => {
            console.error('Cannot remove to wishlist:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['users']);
        },
    });

    const addToWishList = (event: React.MouseEvent) => {
        event.preventDefault();
        mutationAddToWishList.mutate();
    }

    const removeFromWishList = (event: React.MouseEvent) => {
        event.preventDefault();
        mutationRemoveFromWishList.mutate();
    }


    return (
        <div>
            <AddToFavourite id={gameId}>
                <FontAwesomeIcon icon={faHeart} size='2x' className='text-gray-500 hover:text-red-500 transition-colors duration-300' onClick={(event) => addToWishList(event)} />
            </AddToFavourite>
            <RemoveFromFavourite id={gameId}>
                <FontAwesomeIcon icon={faHeart} size='2x' className='text-red-500 hover:text-gray-500 transition-colors duration-300' onClick={(event) => removeFromWishList(event)} />
            </RemoveFromFavourite>
        </div>
    );
}