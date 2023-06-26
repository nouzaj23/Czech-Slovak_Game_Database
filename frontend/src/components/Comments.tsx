import { CommentItem } from './CommentItem';
import { AddCommentForm } from './AddCommentForm';
import { Game, Comment } from '../models';
import { IsLogged } from './Authorized';

interface CommentsProps {
    setIsOpen: Function;
    isOpen: boolean;
    ratingBg: Function;
    game: Game;
    gameComments: Comment[];
    pageComments: number; 
    setPageComments: Function;
}

export const Comments: React.FC<CommentsProps> = ({isOpen, ratingBg, setIsOpen, game, gameComments, pageComments, setPageComments}) => {
    const handleAddComment = () => {
        setIsOpen(!isOpen);
    }

    const handleNextPageComments = () => {
        setPageComments(pageComments + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePreviousPageComments = () => {
        if (pageComments > 0) {
            setPageComments(pageComments - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const itemsPerPage = 5;

    return (
        <div>
            <IsLogged>
                <button onClick={handleAddComment} style={{ background: ratingBg() }} className="px-3 py-2 mb-5 mt-5 bg-blue-500 text-white rounded">Přidat komentář</button>
            </IsLogged>
            <div>
                {isOpen && (
                    <AddCommentForm game={game} />
                )}
            </div>
            <div className="review-list space-y-4">
                {gameComments.slice(pageComments * itemsPerPage, (pageComments + 1) * itemsPerPage).map((comment, index) =>
                    <CommentItem key={index} comment={comment} />)}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePreviousPageComments}
                    style={{ background: ratingBg() }}
                    className={`px-4 py-2 text-white rounded ${pageComments === 0 && 'opacity-50 cursor-not-allowed'}`}
                    disabled={pageComments === 0}
                >
                    Předchozí
                </button>
                <button
                    onClick={handleNextPageComments}
                    style={{ background: ratingBg() }}
                    className={`px-4 py-2 text-white rounded ${gameComments.length <= (pageComments + 1) * itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
                    disabled={gameComments.length <= (pageComments + 1) * itemsPerPage}
                >
                    Další
                </button>
            </div>
        </div>
    )
}