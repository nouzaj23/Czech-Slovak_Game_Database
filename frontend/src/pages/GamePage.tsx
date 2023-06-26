import { useState } from 'react';
import { useParams } from "react-router-dom";
import { Game, Review, Comment } from '../models';
import { GameCard } from '../components/GameCard';
import { GameApi } from '../services';
import { useQuery } from '@tanstack/react-query';
import { Reviews } from '../components/Reviews';
import { Comments } from '../components/Comments';
import { Photos } from '../components/Photos';
import { Videos } from '../components/Videos';


interface RenderEnlargedImageProps {
    selectedImage: string | null;
    setSelectedImage: Function;
}

const RenderEnlargedImage: React.FC<RenderEnlargedImageProps> = ({selectedImage, setSelectedImage}) => {
    if (!selectedImage) return null;

    const handleModalClose = () => {
        setSelectedImage(null);
    };

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

export const GamePage = () => {
    const { id } = useParams<{ id: string }>();
    const [selectedTab, setSelectedTab] = useState('reviews');

    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [pageReviews, setPageReviews] = useState(0);
    const [pageComments, setPageComments] = useState(0);
    const [stars, setStars] = useState<number>(-1);

    if (!id) {
        return <div>Chybí ID hry</div>;
    }

    const { data: gameData } = useQuery<Game>(['games', id], () => GameApi.retrieveGame(id), { enabled: !!id });
    const game = gameData;

    const { data: gameReviewsData } = useQuery<Review[]>(['gameReviews', id], () => GameApi.retrieveGameReviews(id));
    const gameReviews: Review[] = gameReviewsData?.sort((a, b) => b.createdAt.localeCompare(a.createdAt)) ?? [];

    const { data: gameCommentsData } = useQuery<Comment[]>(['gameComments', id], () => GameApi.retrieveGameComments(id));
    const gameComments: Comment[] = gameCommentsData?.filter(comment => comment.content !== undefined).sort((a, b) => b.createdAt.localeCompare(a.createdAt)) ?? [];

    if (!game) {
        return <div>Hra není k dispozici</div>;
    }

    const ratingBg = () => game.rating > 7 ? '#ad0e30' : game.rating > 3 ? '#3690eb' : '#010203';

    return (
        <div className="w-full md:w-3/4 mx-auto p-4 bg-white shadow rounded">
            <div className="bg-white shadow-lg rounded-lg">
                <GameCard game={game} />
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
                {selectedTab == "reviews" && <Reviews setStars={setStars} stars={stars} game={game} gameReviews={gameReviews} isOpen={isOpen} pageReviews={pageReviews} ratingBg={ratingBg} setIsOpen={setIsOpen} setPageReviews={setPageReviews} />}
                {selectedTab == "comments" && <Comments game={game} gameComments={gameComments} isOpen={isOpen} pageComments={pageComments} ratingBg={ratingBg} setIsOpen={setIsOpen} setPageComments={setPageComments} />}
                {selectedTab == "photos" && <Photos game={game} setSelectedImage={setSelectedImage} />}
                {selectedTab == "videos" && <Videos game={game} />}
            </div>
            <RenderEnlargedImage  selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
        </div>
    );
};
