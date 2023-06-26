import { ReviewItem } from '../components/Review';
import { AddReviewForm } from '../components/AddReviewForm'
import { Game, Review } from '../models';
import { IsLogged } from '../components/Authorized';

interface ReviewsProps {
    ratingBg: Function;
    setIsOpen: Function;
    isOpen: boolean;
    game: Game;
    setStars: Function;
    stars: number;
    gameReviews: Review[];
    pageReviews: number;
    setPageReviews: Function,
}

export const Reviews: React.FC<ReviewsProps> = ({ ratingBg, setIsOpen, isOpen, game, gameReviews, pageReviews, setPageReviews, setStars, stars }) => {
    const handleAddReview = () => {
        setIsOpen(!isOpen);
    }

    const handleNextPageReviews = () => {
        setPageReviews(pageReviews + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handlePreviousPageReviews = () => {
        if (pageReviews > 0) {
            setPageReviews(pageReviews - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const itemsPerPage = 5;

    return (
        <div>
            <IsLogged>
                <button onClick={handleAddReview} style={{ background: ratingBg() }} className="px-3 py-2 mb-5 mt-5 text-white rounded">Přidat recenzi</button>
            </IsLogged>
            <div>
                {isOpen && (
                    <AddReviewForm game={game} setStars={setStars} stars={stars} />
                )}
            </div>
            <div>
                <div className="review-list space-y-4">
                    {gameReviews.slice(pageReviews * itemsPerPage, (pageReviews + 1) * itemsPerPage).map((review, key) => (
                        <ReviewItem
                            review={review}
                            key={key}
                            rating={game.rating}
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePreviousPageReviews}
                        style={{ background: ratingBg() }}
                        className={`px-4 py-2 text-white rounded ${pageReviews === 0 && 'opacity-50 cursor-not-allowed'}`}
                        disabled={pageReviews === 0}
                    >
                        Předchozí
                    </button>
                    <button
                        onClick={handleNextPageReviews}
                        style={{ background: ratingBg() }}
                        className={`px-4 py-2 text-white rounded ${gameReviews.length <= (pageReviews + 1) * itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
                        disabled={gameReviews.length <= (pageReviews + 1) * itemsPerPage}
                    >
                        Další
                    </button>
                </div>
            </div>
        </div>
    );
}