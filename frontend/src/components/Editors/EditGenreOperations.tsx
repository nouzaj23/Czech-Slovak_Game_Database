import { Genre } from "../../models";

interface EditGameProps {
    genre: Genre ;
    updateGenre: Function;
}

export const EditGenreName: React.FC<EditGameProps> = ({ genre, updateGenre }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Jméno! Nestyďťě sě! Prostě to řěkňěťě"</label>
            <input
                type="text"
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={genre.type}
                onChange={(event) => updateGenre({ ...genre, name: event.target.value })}
            />
        </div>
    )
}

export const EditGenreDescribtion: React.FC<EditGameProps> = ({ genre, updateGenre }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Popis žánru</label>
            <textarea
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={genre.description}
                onChange={(event) => updateGenre({ ...genre, description: event.target.value })}
            />
        </div>
    )
}
