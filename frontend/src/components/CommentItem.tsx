import { Comment, User } from "../models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GameApi } from "../services";

interface CommentProps {
    comment: Comment;
    users: User[];
}

export const CommentItem: React.FC<CommentProps> = ({ comment, users}) => {
    if (!comment) {
        return <div>Recenze není k dispozici</div>;
    }

    const user = users.find(user => user.id == comment.commenterId);

    if (!user) {
        return <div>User není k dispozici</div>;
    }

    const queryClient = useQueryClient();

    const mutation = useMutation(() => GameApi.deleteComment(comment.id, comment.gameId), {
        onError: (error) => {
            console.error('Failed to delete the comment:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['games']);
        },
    });

    const handleDelete = () => {
        mutation.mutate();
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
