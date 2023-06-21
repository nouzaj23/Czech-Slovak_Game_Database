import { Review, User } from "../models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPoop, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CanDeleteReview } from '../components/Authorized'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GameApi } from "../services";

interface ReviewProps {
    review: Review;
    rating: number;
    users: User[];
}

export const ReviewItem: React.FC<ReviewProps> = ({ review, rating, users }) => {
    if (!review) {
        return <div>Recenze není k dispozici</div>;
    }

    const user = users.find(user => user.id == review.user);

    if (!user) {
        return <div>User není k dispozici</div>;
    }

    const ratingBg = (rating: number) => {
        if (rating > 7) {
            return '#ad0e30';
        }
        else if (rating > 3) {
            return '#3690eb';
        }
        return '#010203';
    }

    const queryClient = useQueryClient();

    const mutation = useMutation(() => GameApi.deleteReview(review.id, review.game), {
        onError: (error) => {
            console.error('Failed to delete the review:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['games']);
        },
    });

    const handleDelete = () => {
        mutation.mutate();
    }

    return (
        <div className="relative">
            <div className="review p-4 bg-white rounded shadow-md space-y-2">
                <h2 className="text-2xl font-bold" style={{ color: ratingBg(rating) }}>{review.title}</h2>
                <p className="text-gray-700">{review.text}</p>
                <div className="font-medium text-gray-500">
                    <div>
                        {review.rating >= 2 ? Array.from({ length: review.rating / 2 }).map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} style={{ color: ratingBg(review.rating) }} />
                        )) : <FontAwesomeIcon icon={faPoop} style={{ color: "green" }} />}
                    </div>
                </div>
                <div className="font-medium text-gray-500">
                    <span className="font-bold text-gray-900">{user.username}</span>
                </div>
                <div className="font-medium text-gray-500">
                    Created At: <span className="font-bold text-gray-900">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <CanDeleteReview id={review.id} >
                    <FontAwesomeIcon icon={faTimes} className="absolute top-2 right-2 cursor-pointer" onClick={() => handleDelete()} />
                </CanDeleteReview>
            </div>
        </div>
    );
};