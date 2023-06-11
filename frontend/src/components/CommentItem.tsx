import { Comment, User } from "../models";
import users from '../assets/users.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface CommentProps {
    commentId: string;
    comments: Comment[];
    setComments: Function;
    setGameComments: Function;
    gameComments: string[];
}

export const CommentItem: React.FC<CommentProps> = ({ commentId, comments, setComments, setGameComments, gameComments }) => {
    const comment = comments.find(comment => comment.id === commentId);

    if (!comment) {
        return <div>Recenze není k dispozici</div>;
    }

    const usersCopy: User[] = users;
    const user = usersCopy.find(user => user.id === comment.user);

    if (!user) {
        return <div>User není k dispozici</div>;
    }

    const handleDelete = () => {
        setGameComments(gameComments.filter(com => com != comment.id));
        setComments(comments.filter(com => com.id != comment.id));
    }

    return (
        <div className="relative">
            <div className="review p-4 bg-white rounded shadow-md space-y-2">
                <p className="text-gray-700">{comment.content}</p>
                <div className="font-medium text-gray-500">
                    <span className="font-bold text-gray-900">{user.username}</span>
                </div>
                <div className="font-medium text-gray-500">
                    Created At: <span className="font-bold text-gray-900">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <FontAwesomeIcon icon={faTimes} className="absolute top-2 right-2 cursor-pointer" onClick={() => handleDelete()}/>
            </div>
        </div>
    );
};
