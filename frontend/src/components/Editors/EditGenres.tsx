import { useState } from "react";
import { Genre } from "../../models";
import { EditGenreDescription, EditGenreName } from "./EditGenreOperations";
import { GenreApi } from "../../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface EditGenreProps {
    genreProp: Genre;
    editedGenreId: string;
}

export const EditGenre: React.FC<EditGenreProps> = ({ genreProp, editedGenreId }) => {
    const [genre, setGenre] = useState(genreProp);

    const queryClient = useQueryClient();
    
    const mutation = useMutation(() => GenreApi.update(genre.id, genre.name, genre.description), {
        onError: (error) => {
            console.error('Failed to edit the genre:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['genres']);
        },
    });

    const updateGenre = () => {
        mutation.mutate();
    }

    return (
        <div>
            {editedGenreId === genre.id && (
                <form className="bg-gray-200 p-6 rounded-md shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-black">Upravit žánr</h3>
                    <div className="space-y-5">
                        <EditGenreName genre={genre} updateGenre={setGenre} />
                        <EditGenreDescription genre={genre} updateGenre={setGenre} />
                    </div>
                    <button
                        className="mt-4 px-4 py-2 text-white rounded-md bg-gray-600 hover:bg-gray-800 transition-colors duration-200"
                        type="submit" onClick={(event) => { event.preventDefault(); updateGenre(); }}
                    >
                        Uložit změny
                    </button>
                </form>
            )}
        </div>
    )
}