import { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import games from '../assets/games.json';
import developers from '../assets/developers.json';
import genres from '../assets/genres.json';
import reviews from '../assets/reviews.json';
import { ReviewItem } from '../components/Review';
import { AddReviewForm } from '../components/AddReviewForm'
import { CommentItem } from '../components/CommentItem';
import { AddCommentForm } from '../components/AddCommentForm';
import { Developer, Genre, Game } from '../models';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player';


export const GamePage = () => {
    const { id } = useParams<{ id: string }>();

    const gamesCopy: Game[] = games;
    const game = gamesCopy.find(game => game.id === id);

    if (!game) {
        return <div>Hra není k dispozici</div>;
    }

    const developersCopy: Developer[] = developers.filter(developer => game.developers.includes(developer.id));
    const genresCopy: Genre[] = genres.filter(genre => game.genres.includes(genre.id));
    const rating: number = reviews.filter(review => game.reviews.includes(review.id)).reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0) / game.reviews.length;


    const [selectedTab, setSelectedTab] = useState('reviews');

    const [isOpen, setIsOpen] = useState(false);

    const handleAddReview = () => {
        setIsOpen(!isOpen);
    }

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleModalClose = () => {
        setSelectedImage(null);
    };

    const renderModal = () => {
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

    const MyGrid = () => {
        const numColumns = 3;
        const numRows = Math.ceil(game.photos.length / numColumns);

        const gridItems = [];

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numColumns; col++) {
                const index = row * numColumns + col;
                if (index < game.photos.length) {
                    const image = game.photos[index];
                    gridItems.push(
                        <div className="col-span-1 p-2 border-4" key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div
                                className={`aspect-w-1 aspect-h-1 cursor-pointer`}
                                onClick={() => handleImageClick(image)}
                            >
                                <img src={image} alt={`Obrázek ${index + 1}`} className="object-cover" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                            </div>
                        </div>

                    );
                }
            }
        }
        return gridItems;
    }

    const renderContent = () => {
        switch (selectedTab) {
            case 'reviews':
                return (
                    <div>
                        <button onClick={handleAddReview} style={{ background: ratingBg() }} className="px-3 py-2 mb-5 mt-5 text-white rounded">Přidat recenzi</button>
                        <div>
                            {isOpen && (
                                <AddReviewForm />
                            )}
                        </div>
                        <div className="review-list space-y-4">
                            {game.reviews.map((reviewId) => <ReviewItem reviewId={reviewId} rating={rating} />)}
                        </div>
                    </div>
                );
            case 'comments':
                return (
                    <div>
                        <button onClick={handleAddReview} style={{ background: ratingBg() }} className="px-3 py-2 mb-5 mt-5 bg-blue-500 text-white rounded">Přidat komentář</button>
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
                    <div className="container">
                        <div className={`grid grid-cols-${3} gap-2`}>{MyGrid()}</div>
                    </div>
                );
            case 'videos':
                return (
                    <div className='container'>
                        {game.videos.map(video =>
                            <div className="w-full h-screen flex items-center justify-center mt-5">
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
                return <p>Recenze</p>;
        }
    };

    const ratingBg = () => {
        if (rating > 7) {
            return '#ad0e30';
        }
        else if (rating > 3) {
            return '#3690eb';
        }
        return '#010203';
    }

    return (
        <div className="w-3/4 mx-auto p-4 bg-white shadow rounded">
            <div className="flex bg-white shadow-lg rounded-lg p-6 relative">
                <img src={game.cover} alt="popis" className="w-1/4 rounded-lg" />
                <div className="ml-4 w-3/4">
                    <h2 className="text-xl font-bold">{game.name}</h2>
                    <p className="mt-2 text-gray-600">Developers: {developersCopy.map((developer, index) => <Link to="" key={index} className="text-blue-500 hover:underline">{developer.name}{index !== developersCopy.length - 1 && ', '}</Link>)}</p>
                    <p className="mt-2 text-gray-600">Release Date: {game.releaseDate}</p>
                    <p className="mt-2 text-gray-600">Genres: {genresCopy.map((genre, index) => <Link to="" key={index} className="text-blue-500 hover:underline">{genre.type}{index !== genresCopy.length - 1 && ', '}</Link>)}</p>
                    <p className="mt-4 text-gray-700">
                        {game.description}
                    </p>
                </div>
                <div className="absolute top-2 right-2 text-white rounded-full px-3 py-1 shadow-md" style={{ background: ratingBg() }}>
                    <p className="font-bold text-lg">{rating.toFixed(1)}</p>
                </div>
                <div className="absolute top-12 right-4">
                    <FontAwesomeIcon icon={faHeart} size='2x' className='text-red-500' />
                </div>
            </div>

            <div className="mt-4 flex justify-around gap-4">
                <button onClick={() => setSelectedTab('reviews')} style={{ background: ratingBg() }} className="px-3 py-2 text-white w-full hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                    Recenze
                </button>
                <button onClick={() => setSelectedTab('comments')} style={{ background: ratingBg() }} className="px-3 py-2 bg-blue-500 text-white w-full hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                    Komentáře
                </button>
                <button onClick={() => setSelectedTab('photos')} style={{ background: ratingBg() }} className="px-3 py-2 bg-blue-500 text-white w-full hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                    Fotografie
                </button>
                <button onClick={() => setSelectedTab('videos')} style={{ background: ratingBg() }} className="px-3 py-2 bg-blue-500 text-white w-full hover:bg-blue-600 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg">
                    Videa
                </button>
            </div>
            <div className="mt-4">
                {renderContent()}
            </div>
            {renderModal()}
        </div>
    );
};
