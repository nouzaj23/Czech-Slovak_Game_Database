import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game } from "../models";
import { GameApi } from "../services";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";

interface AddCommentProps {
    game: Game;
}

type FormValues = {
    content: string;
}

export const AddCommentForm: React.FC<AddCommentProps> = ({ game }) => {
    const { auth } = useAuth();
    const form = useForm<FormValues>();
    const { register, handleSubmit, getValues } = form;

    const queryClient = useQueryClient();
    const mutation = useMutation(() => GameApi.addComment(getValues("content"), auth.userId, game.id), {
        onError: (error) => {
            console.error('Failed to add the comment:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['gameComments', game.id]);
        },
    });

    const onSubmit = () => {
        mutation.mutate();
    }

    return (
        <div className="flex flex-col space-y-4 w-full md:max-w-[500px] mx-auto bg-gray-200 p-4 rounded-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="flex flex-col space-y-2">
                    Komentář:
                    <textarea
                        className="p-2 rounded border-gray-300 min-h-[100px]"
                        required
                        {...register("content")}
                    ></textarea>
                </label>
                <div className="mt-3">
                    <button type="submit"
                        value="Přidat komentář"
                        className="p-2 bg-blue-500 text-white border-none cursor-pointer rounded">Přidat komentář
                    </button>
                </div>
            </form>
        </div>
    );
}
