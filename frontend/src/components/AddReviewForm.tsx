import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faPoop } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Game } from '../models';

interface AddReviewProps {
    gameId: string;
    game: Game;
}


export const AddReviewForm: React.FC<AddReviewProps> = ({ gameId, game }) => {
    const [stars, setStars] = useState(3);

    if (gameId == "") {
        <div>404</div>
    }

    if (!game) {
        return <div>Hra není k dispozici</div>;
    }

    function handleStarClick(rating: number) {
        setStars(rating);
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

    // const [reviewedGame, setReviewedGame] = useState<Game>(game);

    // const handleSubmitReview = async () => {
    //     try {
    //         var nameElement = document.getElementById('name') as HTMLTextAreaElement;
    //         var contentElement = document.getElementById('review') as HTMLTextAreaElement;
    //         if (nameElement && contentElement) {

    //             var newReview: Review = { createdAt: new Date().toISOString(), game: gameId, id: "100", rating: 2, text: "kokot", title: "kokot2", user: "1" };
    //             if (reviewedGame) {
    //                 setReviewedGame(oldGame => {
    //                     if (oldGame) {
    //                         return {
    //                             ...oldGame,
    //                             reviews: [...oldGame.reviews, newReview.id]
    //                         };
    //                     }
    //                     return oldGame;
    //                 });
    //             }
    //             contentElement.value = '';
    //             nameElement.value = '';
    //         }
    //     } catch (error) {
    //         console.error("Chyba při přidávání/odebírání recenze: ", error);
    //     }
    // };

    return (
        <div>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1em', maxWidth: '500px', margin: 'auto', backgroundColor: '#f0f0f0', padding: '1em', borderRadius: '0.5em' }}>
                <div>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                        Title:
                        <input type="text" name="name" style={{ padding: '0.5em', borderRadius: '0.25em', border: '1px solid #ccc' }} />
                    </label>
                </div>
                <div>
                    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5em' }}>
                        Review:
                        <textarea name="review" style={{ padding: '0.5em', borderRadius: '0.25em', border: '1px solid #ccc', minHeight: '100px' }}></textarea>
                    </label>
                </div>
                <div>
                    <FontAwesomeIcon icon={faPoop} onClick={() => handleStarClick(0)} id="star0" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(1)} id="star1" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(2)} id="star2" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(3)} id="star3" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(4)} id="star4" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(5)} id="star5" />
                    {/* <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(6)} id="star6" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(7)} id="star7" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(8)} id="star8" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(9)} id="star9" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(10)} id="star10" /> */}
                </div>
                <div>
                    <button value="Odeslat" style={{ padding: '0.5em', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '0.25em' }}>Odeslat</button>
                </div>
            </form>
        </div>
    );
}