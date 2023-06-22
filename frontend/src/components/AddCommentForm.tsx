import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, Comment } from "../models";
import { GameApi } from "../services";
import { useState } from "react";
import useAuth from "../hooks/useAuth";

interface AddCommentProps {
    game: Game;
}

export const AddCommentForm: React.FC<AddCommentProps> = ({ game }) => {
    const { auth } = useAuth();

    const queryClient = useQueryClient();
    const mutation = useMutation(() => GameApi.addComment(comment.content, auth.userId, comment.gameId), {
        onError: (error) => {
            console.error('Failed to add the comment:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['gameComments', comment.gameId]);
        },
    });

    const [comment, setComment] = useState<Comment>({ content: "", createdAt: "", gameId: game.id, id: "", commenter: auth.userId});

    const handleSubmitComment = () => {
        if (comment.content != "") {
            mutation.mutate();
            (document.getElementById('text') as HTMLTextAreaElement).value = '';
        }
    }

    return (
        <div className="flex flex-col space-y-4 w-full md:max-w-[500px] mx-auto bg-gray-200 p-4 rounded-md">
            <div>
                <label className="flex flex-col space-y-2">
                    Komentář:
                    <textarea name="comment" id="text" className="p-2 rounded border-gray-300 min-h-[100px]" onChange={(event) => setComment({...comment, content: event.target.value})}></textarea>
                </label>
            </div>
            <div>
                <input type="submit" value="Přidat komentář" onClick={(event) => { event.preventDefault(); handleSubmitComment(); }} className="p-2 bg-blue-500 text-white border-none cursor-pointer rounded" />
            </div>
        </div>
    );
}