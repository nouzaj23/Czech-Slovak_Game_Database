import { Review, User } from "../models";
import users from '../assets/users.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPoop, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CanDeleteReview } from '../components/Authorized'

interface ReviewProps {
    reviewId: string;
    rating: number;
    reviews: Review[];
    setReviews: Function;
    setGameReviews: Function;
    gameReviews: string[];
}

export const ReviewItem: React.FC<ReviewProps> = ({ reviewId, rating, reviews, setGameReviews, setReviews, gameReviews }) => {
    const review = reviews.find(rev => rev.id === reviewId);

    if (!review) {
        return <div>Recenze není k dispozici</div>;
    }

    const usersCopy: User[] = users;
    const user = usersCopy.find(user => user.id === review.user);

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

    const handleDelete = () => {
        setGameReviews(gameReviews.filter(revId => revId != review.id));
        setReviews(reviews.filter(rev => rev.id != review.id));
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
                <CanDeleteReview id={reviewId} >
                    <FontAwesomeIcon icon={faTimes} className="absolute top-2 right-2 cursor-pointer" onClick={() => handleDelete()} />
                </CanDeleteReview>
            </div>
        </div>
    );
};