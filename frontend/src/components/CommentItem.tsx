import { Comment, User } from "../models";
import comments from '../assets/comments.json';
import users from '../assets/users.json';

interface CommentProps {
    commentId: string;
}

export const CommentItem: React.FC<CommentProps> = ({ commentId }) => {
    const commentsCopy: Comment[] = comments;
    const comment = commentsCopy.find(comment => comment.id === commentId);

    if (!comment) {
        return <div>Recenze není k dispozici</div>;
    }

    const usersCopy: User[] = users;
    const user = usersCopy.find(user => user.id === comment.user);

    if (!user) {
        return <div>User není k dispozici</div>;
    }

    return (
        <div>
            <div className="review p-4 bg-white rounded shadow-md space-y-2">
                <p className="text-gray-700">{comment.content}</p>
                <div className="font-medium text-gray-500"><span className="font-bold text-gray-900">{user.username}</span></div>
                <div className="font-medium text-gray-500">Created At: <span className="font-bold text-gray-900">{new Date(comment.createdAt).toLocaleDateString()}</span></div>
            </div>
        </div>
    );
};