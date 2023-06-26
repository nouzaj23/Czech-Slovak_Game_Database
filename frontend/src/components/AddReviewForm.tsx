import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPoop } from '@fortawesome/free-solid-svg-icons';
import { Game } from '../models';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GameApi } from '../services';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';


interface AddReviewProps {
    game: Game;
    stars: number;
    setStars: Function;
}

type FormValues = {
    title: string;
    content: string;
    rating: number;
}

export const AddReviewForm: React.FC<AddReviewProps> = ({ game, setStars }) => {
    const { auth } = useAuth();
    const { register, handleSubmit, getValues, setValue } = useForm<FormValues>();

    if (!game) {
        return <div>Hra není k dispozici</div>;
    }

    // function handleStarClick(rating: number) {
    //     setStars(rating);
    // }

    const ratingBg = () => getValues("rating") > 6 ? '#ad0e30' : getValues("rating") > 2 ? '#3690eb' : '#010203';

    function starStyle(starNum: number) {
        return getValues("rating") >= starNum * 2 ? ratingBg() : '#92a1b0';
    }

    const queryClient = useQueryClient();
    const mutation = useMutation(() => GameApi.addReview(getValues("title"), getValues("content"), getValues("rating"), game.id, auth.userId), {
        onError: (error) => {
            console.error('Failed to add the review:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['gameReviews', game.id]);
        },
    });

    const onSumit = () => {
        mutation.mutate();
    }

    return (
        <div className="flex flex-col space-y-4 w-full md:w-1/2 mx-auto bg-gray-200 p-4 rounded-md">
            <form onSubmit={handleSubmit(onSumit)}>
                <div>
                    <label className="flex flex-col space-y-2">
                        Nadpis:
                        <input type="text"
                            className="p-2 rounded border-gray-300"
                            required
                            {...register("title")}
                        />
                    </label>
                </div>
                <div>
                    <label className="flex flex-col space-y-2">
                        Recenze:
                        <textarea className="p-2 rounded border-gray-300 min-h-[100px]"
                            {...register("content")}
                        >
                        </textarea>
                    </label>
                </div>
                <div>
                    <FontAwesomeIcon icon={faPoop}
                        // onClick={() => handleStarClick(0)}
                        onClick={() => {setValue("rating", 0); setStars(0)}}
                        style={{ color: starStyle(0) }} />
                    <FontAwesomeIcon icon={faStar}
                        // onClick={() => handleStarClick(1)}
                        onClick={() => {setValue("rating", 2); setStars(1)}}
                        style={{ color: starStyle(1) }} />
                    <FontAwesomeIcon icon={faStar}
                        // onClick={() => handleStarClick(2)}
                        onClick={() => setValue("rating", 4)}
                        style={{ color: starStyle(2) }} />
                    <FontAwesomeIcon icon={faStar}
                        // onClick={() => handleStarClick(3)}
                        onClick={() => setValue("rating", 6)}
                        style={{ color: starStyle(3) }} />
                    <FontAwesomeIcon icon={faStar}
                        // onClick={() => handleStarClick(4)}
                        onClick={() => setValue("rating", 8)}
                        style={{ color: starStyle(4) }} />
                    <FontAwesomeIcon icon={faStar}
                        // onClick={() => handleStarClick(5)}
                        onClick={() => setValue("rating", 10)}
                        style={{ color: starStyle(5) }} />
                </div>
                <div>
                    <button type="submit"
                        value="Odeslat"
                        className="p-2 bg-blue-500 text-white border-none cursor-pointer rounded">Přidat recenzi
                    </button>
                </div>
            </form>
        </div>
    );
}