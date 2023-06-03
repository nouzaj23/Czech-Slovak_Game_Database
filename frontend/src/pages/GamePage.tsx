import { useState } from 'react';
import { Game } from '../models/game';
import { useParams } from "react-router-dom";
import games from '../assets/games.json';
import { ReviewItem } from '../components/Review';
import { AddReviewForm } from '../components/AddReviewForm'
import { CommentItem } from '../components/CommentItem';
import { AddCommentForm } from '../components/AddCommentForm';


export const GamePage = () => {
    const { id } = useParams<{ id: string }>();

    let gamesCopy: Game[] = games;
    const game = gamesCopy.find(game => game.id === id);

    if (!game) {
        return <div>Hra není k dispozici</div>;
    }

    const [selectedTab, setSelectedTab] = useState('reviews');

    const [isOpen, setIsOpen] = useState(false);

    const handleAddReview = () => {
        setIsOpen(!isOpen);
    }

    const renderContent = () => {
        switch (selectedTab) {
            case 'reviews':
                return (
                    <div>
                        <button onClick={handleAddReview} className="px-3 py-2 mb-5 mt-5 bg-blue-500 text-white rounded">Přidat recenzi</button>
                        <div>
                            {isOpen && (
                                <AddReviewForm />
                            )}
                        </div>
                        <div className="review-list space-y-4">
                            {game.reviews.map((reviewId) => <ReviewItem reviewId={reviewId} />)}
                        </div>
                    </div>
                );
            case 'comments':
                return (
                    <div>
                        <button onClick={handleAddReview} className="px-3 py-2 mb-5 mt-5 bg-blue-500 text-white rounded">Přidat komentář</button>
                        <div>
                            {isOpen && (
                                <AddCommentForm />
                            )}
                        </div>
                        <div className="review-list space-y-4">
                            {game.comments.map((commentId) => <CommentItem commentId={commentId} />)}
                        </div>
                    </div>
                );
            case 'photos':
                return (
                    <div>
                        
                    </div>
                );
            case 'videos':
                return <p>Videa</p>;
            default:
                return <p>Recenze</p>;
        }
    };

    return (
        <div className="w-3/4 mx-auto p-4 bg-white shadow rounded">
            <div className="flex">
                <img src={game.cover} alt="popis" className="w-1/4" />
                <div className="ml-4 w-3/4">
                    <h2 className="text-xl font-bold">{game.name}</h2>
                    <p>
                        {game.description}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex justify-around">
                <button onClick={() => setSelectedTab('reviews')} className="px-3 py-2 bg-blue-500 text-white rounded">Recenze</button>
                <button onClick={() => setSelectedTab('comments')} className="px-3 py-2 bg-blue-500 text-white rounded">Komentáře</button>
                <button onClick={() => setSelectedTab('photos')} className="px-3 py-2 bg-blue-500 text-white rounded">Fotografie</button>
                <button onClick={() => setSelectedTab('videos')} className="px-3 py-2 bg-blue-500 text-white rounded">Videa</button>
            </div>

            <div className="mt-4">
                {renderContent()}
            </div>
        </div>
    );
};
