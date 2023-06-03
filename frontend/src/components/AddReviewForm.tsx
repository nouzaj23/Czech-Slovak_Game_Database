import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

export const AddReviewForm = () => {

    const [stars, setStars] = useState(5);

    function handleStarClick(rating: number) {
        setStars(rating);
    }

    useEffect(() => {
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
        const starElement6 = document.getElementById('star6');
        if (starElement6) {
            starElement6.style.color = starStyle(6);
        }
        const starElement7 = document.getElementById('star7');
        if (starElement7) {
            starElement7.style.color = starStyle(7);
        }
        const starElement8 = document.getElementById('star8');
        if (starElement8) {
            starElement8.style.color = starStyle(8);
        }
        const starElement9 = document.getElementById('star9');
        if (starElement9) {
            starElement9.style.color = starStyle(9);
        }
        const starElement10 = document.getElementById('star10');
        if (starElement10) {
            starElement10.style.color = starStyle(10);            
        }
    });

    function starStyle(starNum: number) {
        return stars >= starNum ? 'red' : 'black';
    }

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
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(1)} id="star1" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(2)} id="star2" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(3)} id="star3" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(4)} id="star4" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(5)} id="star5" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(6)} id="star6" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(7)} id="star7" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(8)} id="star8" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(9)} id="star9" />
                    <FontAwesomeIcon icon={faStar} onClick={() => handleStarClick(10)} id="star10" />
                </div>
                <div>
                    <input type="submit" value="Odeslat" style={{ padding: '0.5em', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '0.25em' }} />
                </div>
            </form>
        </div>
    );
}