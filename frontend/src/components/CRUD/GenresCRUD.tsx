import { MouseEventHandler, useState } from 'react';
// import genresList from '../../assets/genres.json';
import { Genre } from '../../models';
import { EditGenre } from '../Editors/EditGenres';
import { GenreApi } from '../../services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteGenreProps {
    handleClose: MouseEventHandler;
    genreId: string,
    genres: Genre[],
}

export const DeleteGenreConfirm: React.FC<DeleteGenreProps> = ({ handleClose, genreId }) => {
    const deleteGenre = async (event: React.MouseEvent) => {
        try {
            await GenreApi.remove(genreId);
            // updateGenres(genres.filter(genre => genre.id !== genreId)); 
        }
        catch (error) {
            console.log("Genre cannot be deleted", error)
        }
        finally {
            handleClose(event);
        }
    };

    return (
        <div className='border-2 border-black-1000'>
            <form className="p-6 bg-white rounded shadow-md">
                <p>Opravdu chcete smazat žánr?</p>
                <div className="flex items-center justify-between mt-4">
                    <button className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded" type="button" onClick={(event) => { deleteGenre(event); handleClose(event); }}  >Potvrdit</button>
                    <button className="ml-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleClose}>Storno</button>
                </div>
            </form>
        </div>
    );
};

interface GenresCRUDProps {
    genres: Genre[];
}


export const GenresCRUD: React.FC<GenresCRUDProps> = ({genres}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [editedGenreId, setEditedGenreId] = useState<string | null>(null);
    const [genreToDelete, setGenreToDelete] = useState<string | null>(null);

    const filteredGenres = genres.filter(genre =>
        genre.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const queryClient = useQueryClient();
    
    const mutation = useMutation(() => GenreApi.add("New Genre", "Description"), {
        onError: (error) => {
            console.error('Failed to add the genre:', error);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['genres']);
        },
    });

    const addGenre = () => {
        mutation.mutate();
    }

    // const addGenre = async () => {
    //     const name = 'New Genre';
    //     const description = 'Description';
    //     try {
    //         await GenreApi.add(name, description);
    //         // setGenres([newGenre, ...genres]);
    //     } catch (error) {
    //         console.error('Failed to add the developer:', error);
    //     }
    // }

    return (
        <div className='flex justify-center'>
            <div className="p-6 space-y-4 w-full md:w-3/4">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold">Žánry</h1>
                    <button className="px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded-md" onClick={addGenre}>Přidat žánr</button>
                </div>
                <input
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    type="text"
                    placeholder="Hledat žánry..."
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                {filteredGenres.map(genre => (
                    <div key={genre.id} className="p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-semibold">{genre.name}</h2>
                        <div className="mt-2 space-y-2">
                            <p>{genre.description}</p>
                        </div>
                        <div className="mt-4 space-x-4">
                            <button
                                className="w-auto px-4 py-2 text-white bg-gray-600 hover:bg-gray-800 rounded-md"
                                onClick={() => setEditedGenreId(editedGenreId === genre.id ? null : genre.id)}
                            >
                                Upravit
                            </button>
                            <button className="w-auto px-4 py-2 text-white bg-red-500 rounded-md border-red-800" onClick={() => setGenreToDelete(genre.id)}>Smazat</button>
                            {genreToDelete === genre.id && (
                                <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
                                    <DeleteGenreConfirm handleClose={() => setGenreToDelete(null)} genreId={genre.id} genres={genres} />
                                </div>
                            )}
                        </div>
                        {editedGenreId === genre.id && (
                            <div className='mt-5'>
                                <EditGenre editedGenreId={genre.id} genreProp={genre} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
