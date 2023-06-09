import { Game, Comment } from "../models";

interface AddCommentProps {
    setComments: Function;
    setGameComments: Function;
    comments: Comment[];
    game: Game;
}

export const AddCommentForm: React.FC<AddCommentProps> = ({ setComments, game, setGameComments, comments }) => {
    const handleSubmitComment = async () => {
        try {
            const text = document.getElementById('text') as HTMLTextAreaElement;
            if (text) {
                const newComment: Comment = { content: text.value, createdAt: new Date().toISOString(), game: game.id, id: "21", user: "1" };
                if (game) {
                    setGameComments([newComment.id, ...game.comments]);
                    setComments([newComment, ...comments]);
                }
                text.value = '';
            }
        } catch (error) {
            console.error("Chyba při přidávání/odebírání komentáře: ", error);
        }
    };
    return (
        <div className="flex flex-col space-y-4 w-full md:max-w-[500px] mx-auto bg-gray-200 p-4 rounded-md">
            <div>
                <label className="flex flex-col space-y-2">
                    Komentář:
                    <textarea name="comment" id="text" className="p-2 rounded border-gray-300 min-h-[100px]"></textarea>
                </label>
            </div>
            <div>
                <input type="submit" value="Odeslat" onClick={(event) => { event.preventDefault(); handleSubmitComment(); }} className="p-2 bg-blue-500 text-white border-none cursor-pointer rounded" />
            </div>
        </div>
    );
}