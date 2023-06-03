import { Review, User } from "../models";
import reviews from '../assets/reviews.json';
import users from '../assets/users.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

interface ReviewProps {
    reviewId: string;
}

export const ReviewItem: React.FC<ReviewProps> = ({ reviewId }) => {
    const reviewsCopy: Review[] = reviews;
    const review = reviewsCopy.find(rev => rev.id === reviewId);

    if (!review) {
        return <div>Recenze není k dispozici</div>;
    }

    const usersCopy: User[] = users;
    const user = usersCopy.find(user => user.id === review.user);

    if (!user) {
        return <div>User není k dispozici</div>;
    }

    return (
        <div>
            <div className="review p-4 bg-white rounded shadow-md space-y-2">
                <h2 className="text-2xl font-bold text-blue-500">{review.title}</h2>
                <p className="text-gray-700">{review.text}</p>
                <div className="font-medium text-gray-500">
                    <div>
                        {Array.from({ length: review.rating }).map((_, i) => (
                            <FontAwesomeIcon key={i} icon={faStar} />
                        ))}
                    </div>
                </div>
                <div className="font-medium text-gray-500"><span className="font-bold text-gray-900">{user.username}</span></div>
                <div className="font-medium text-gray-500">Created At: <span className="font-bold text-gray-900">{new Date(review.createdAt).toLocaleDateString()}</span></div>
            </div>
        </div>
    );
};