import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPoop } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Game, Review } from '../models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameApi } from '../services';
import useAuth from '../hooks/useAuth';

interface AddReviewProps {
    gameId: string;
    game: Game;
    stars: number;
    setStars: Function;
}


export const AddReviewForm: React.FC<AddReviewProps> = ({ gameId, game, stars, setStars }) => {
    const { auth } = useAuth();

    if (gameId == "") {

    }

    if (!game) {
        return <div>Hra není k dispozici</div>;
    }

    function handleStarClick(rating: number) {
        setStars(rating);
        setReview({ ...review, rating: stars * 2 });
    }

    useEffect(() => {
        const starElementPoop = document.getElementById('star0');
        if (starElementPoop) {
            starElementPoop.style.color = stars > 0 ? 'black' : 'green';;
        }
        const starElement = document.getElementById('star1');
        if (starElement) {
            starElement.style.color = starStyle(1);
        }
        const starElement2 = document.getElementById('star2');
        if (starElement2) {
            starElement2.style.color = starStyle(2);
        }
        const starElement3 = document.getElementById('star3');
        if (starElement3) {
            starElement3.style.color = starStyle(3);
        }
        const starElement4 = document.getElementById('star4');
        if (starElement4) {
            starElement4.style.color = starStyle(4);
        }
        const starElement5 = document.getElementById('star5');
        if (starElement5) {
            starElement5.style.color = starStyle(5);
        }
    });

    const ratingBg = (stars: number) => {
        if (stars > 3) {
            return '#ad0e30';
        }
        else if (stars > 1) {
            return '#3690eb';
        }
        return '#010203';
    }

    function starStyle(starNum: number) {
        return stars >= starNum ? ratingBg(stars) : '#92a1b0';
    }

    const queryClient = useQueryClient();
    const mutation = useMutation(() => GameApi.addReview(review.title, review.text, stars * 2, review.game.id, auth.userId), {
        onError: (error) => {
            console.error('Failed to add the review:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['gameReviews', review.game.id]);
        },
    });

    const [review, setReview] = useState<Review>({ createdAt: "", game: game, id: "", rating: stars * 2, text: "", title: "", user: auth.userId });

    const handleSubmitReview = () => {
        if (review.text != "" && review.title != "") {
            mutation.mutate();
            (document.getElementById('title') as HTMLTextAreaElement).value = '';
            (document.getElementById('reviewText') as HTMLTextAreaElement).value = '';
        }
    }

    return (
        <div className="flex flex-col space-y-4 w-full md:w-1/2 mx-auto bg-gray-200 p-4 rounded-md">
            <div>
                <label className="flex flex-col space-y-2">
                    Nadpis:
                    <input type="text"
                        name="name"
                        className="p-2 rounded border-gray-300"
                        id="title"
                        onChange={(event) => setReview({ ...review, title: event.target.value })} />
                </label>
            </div>
            <div>
                <label className="flex flex-col space-y-2">
                    Recenze:
                    <textarea name="review"
                        id="reviewText"
                        className="p-2 rounded border-gray-300 min-h-[100px]"
                        onChange={(event) => setReview({ ...review, text: event.target.value })}>
                    </textarea>
                </label>
            </div>
            <div>
                <FontAwesomeIcon icon={faPoop} onClick={() => handleStarClick(0)} id="star0" />
                <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(1)} id="star1" />
                <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(2)} id="star2" />
                <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(3)} id="star3" />
                <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(4)} id="star4" />
                <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(5)} id="star5" />
            </div>
            <div>
                <button value="Odeslat" className="p-2 bg-blue-500 text-white border-none cursor-pointer rounded"
                    onClick={(event) => { event.preventDefault(); handleSubmitReview(); }}>Přidat recenzi</button>
            </div>
        </div>

    );
}