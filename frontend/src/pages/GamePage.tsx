import { useState } from 'react';
import { useParams } from "react-router-dom";
import { ReviewItem } from '../components/Review';
import { AddReviewForm } from '../components/AddReviewForm'
import { CommentItem } from '../components/CommentItem';
import { AddCommentForm } from '../components/AddCommentForm';
import { Game, Review, User, Comment } from '../models';
import ReactPlayer from 'react-player';
import { GameCard } from '../components/GameCard';
import { GameApi, UserApi } from '../services';
import { useQuery } from '@tanstack/react-query';

export const GamePage = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedTab, setSelectedTab] = useState('reviews');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [stars, setStars] = useState(3);

    if (!id) {
        return <div>Chybí ID hry</div>;
    }

    const { data: gameData } = useQuery<Game>(['games', id], () => GameApi.retrieveGame(id), { enabled: !!id });
    const game = gameData;
    
    const {data: gameReviewsData} = useQuery<Review[]>(['gameReviews', id], () => GameApi.retrieveGameReviews(id));
    const gameReviews: Review[] = gameReviewsData ?? [];

    console.log(gameReviews.length)

    const {data: gameCommentsData} = useQuery<Comment[]>(['gameComments', id], () => GameApi.retrieveGameComments(id));
    const gameComments: Comment[] = gameCommentsData ?? [];

    if (!game) {
        return <div>Hra není k dispozici</div>;
    }

    const handleAddReview = () => {
        setIsOpen(!isOpen);
    }

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
    };

    const renderEnlargedImage = () => {
        if (!selectedImage) return null;

        return (
            <div
                className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50"
                onClick={handleModalClose}
            >
                <div className="max-w-5xl max-h-5xl bg-white p-4 flex justify-center items-center">
                    <img src={selectedImage} alt="Zvětšený obrázek" className="w-auto h-auto max-w-full max-h-full" />
                </div>
            </div>
        );
    };

    const ImagesGrid = (numColumns: number) => {
        const numRows: number = Math.ceil(game.photos.length / numColumns);

        const gridItems = [];

        for (let row: number = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                const index = row * numColumns + col;
                if (index < game.photos.length) {
                    const image = game.photos[index];
                    gridItems.push(
                        <div className="col-span-1 p-2 border-4 flex items-center justify-center" key={index}>
                            <div
                                className={`aspect-w-1 aspect-h-1 cursor-pointer`}
                                onClick={() => handleImageClick(image)}
                            >
                                <img src={image} alt={`Obrázek ${index + 1}`} className="object-cover max-w-full max-h-full" />
                            </div>
                        </div>

                    );
                }
            }
        }
        return gridItems;
    }

    const itemsPerPage = 5;
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

    const renderContent = () => {
        switch (selectedTab) {
            case 'reviews':
                return (
                    <div>
                        <button onClick={handleAddReview} style={{ background: ratingBg() }} className="px-3 py-2 mb-5 mt-5 text-white rounded">Přidat recenzi</button>
                        <div>
                            {isOpen && (
                                <AddReviewForm gameId={game.id} game={game} setStars={setStars} stars={stars}/>
                            )}
                        </div>
                        <div>
                            <div className="review-list space-y-4">
                                {gameReviews.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((review, key) => (
                                    <ReviewItem
                                        review={review}
                                        key={key}
                                        rating={game.rating}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={handlePreviousPage}
                                    style={{ background: ratingBg()}}
                                    className={`px-4 py-2 text-white rounded ${page === 0 && 'opacity-50 cursor-not-allowed'}`}
                                    disabled={page === 0}
                                >
                                    Předchozí
                                </button>
                                <button
                                    onClick={handleNextPage}
                                    style={{ background: ratingBg()}}
                                    className={`px-4 py-2 text-white rounded ${gameReviews.length <= (page + 1) * itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
                                    disabled={gameReviews.length <= (page + 1) * itemsPerPage}
                                >
                                    Další
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'comments':
                return (
                    <div>
                        <button onClick={handleAddReview} style={{ background: ratingBg() }} className="px-3 py-2 mb-5 mt-5 bg-blue-500 text-white rounded">Přidat komentář</button>
                        <div>
                            {isOpen && (
                                <AddCommentForm game={game} />
                            )}
                        </div>
                        <div className="review-list space-y-4">
                            {gameComments.map((comment, index) => <CommentItem key={index} comment={comment}/>)}
                        </div>
                    </div>
                );
            case 'photos':
                return (
                    <div className="container">
                        {/* Hidden on small screens - photos in grid */}
                        <div className="hidden sm:block">
                            <div className={`grid grid-cols-${3} gap-2`}>{ImagesGrid(3)}</div>
                        </div>
                        {/* Hidden on big screens - photos in one column */}
                        <div className='block sm:hidden'>
                            <div className={`grid grid-cols-${1} gap-2`}>{ImagesGrid(1)}</div>
                        </div>
                    </div>
                );
            case 'videos':
                return (
                    <div className='container'>
                        {game.videos.map((video, index) =>
                            <div key={index} className="w-full h-screen flex items-center justify-center mt-5">
                                <ReactPlayer
                                    url={video}
                                    controls={true}
                                    width='100%'
                                    height='100%'
                                />
                            </div>
                        )}
                    </div>
                );
            default:
                return <p></p>;
        }
    };

    const ratingBg = () => game.rating > 7 ? '#ad0e30' : game.rating > 3 ? '#3690eb' : '#010203';

    return (
        <div className="w-full md:w-3/4 mx-auto p-4 bg-white shadow rounded">
            <div className="bg-white shadow-lg rounded-lg">
                <GameCard game={game}/>
            </div>
            <div className="mt-4 flex justify-around gap-1 sm:gap-4">
                <button onClick={() => setSelectedTab('reviews')} style={{ background: ratingBg() }} className="px-3 py-2 text-sm sm:text-lg text-white w-full hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                    Recenze
                </button>
                <button onClick={() => setSelectedTab('comments')} style={{ background: ratingBg() }} className="px-3 py-2 text-sm sm:text-lg text-white w-full hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                    Komentáře
                </button>
                <button onClick={() => setSelectedTab('photos')} style={{ background: ratingBg() }} className="px-3 py-2 text-sm sm:text-lg text-white w-full hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                    Fotografie
                </button>
                <button onClick={() => setSelectedTab('videos')} style={{ background: ratingBg() }} className="px-3 py-2 text-sm sm:text-lg text-white w-full hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                    Videa
                </button>
            </div>
            <div className="mt-4">
                {renderContent()}
            </div>
            {renderEnlargedImage()}
        </div>
    );
};
