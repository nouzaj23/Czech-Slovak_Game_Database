import { Developer, Game, Genre } from "../../models";
import { useEffect, useState } from "react";

interface EditGameProps {
    game: Game;
    updateGame: Function;
}

export const EditGameName: React.FC<EditGameProps> = ({ game, updateGame }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Jméno</label>
            <input
                type="text"
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={game.name}
                onChange={(event) => updateGame({ ...game, name: event.target.value })}
            />
        </div>
    )
}

export const EditGameDescription: React.FC<EditGameProps> = ({ game, updateGame }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Popis hry</label>
            <textarea
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={game.description}
                onChange={(event) => updateGame({ ...game, description: event.target.value })}
            />
        </div>
    )
}

export const EditGameCover: React.FC<EditGameProps> = ({ game, updateGame }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Obálka</label>
            <input
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={game.cover}
                onChange={(event) => updateGame({ ...game, cover: event.target.value })}
            />
        </div>
    )
}

export const EditGameReleaseDate: React.FC<EditGameProps> = ({ game, updateGame }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Datum vydání</label>
            <input
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={game.releaseDate}
                onChange={(event) => updateGame({ ...game, releaseDate: event.target.value })}
            />
        </div>
    )
}

export const EditGamePhotos: React.FC<EditGameProps> = ({ game, updateGame }) => {
    const addPhoto = () => {
        updateGame({ ...game, photos: [...game.photos, ""] });
    };

    const updatePhoto = (index: number, newPhotoUrl: string) => {
        updateGame({ ...game, photos: game.photos.map((photo, i) => i === index ? newPhotoUrl : photo) })
    };
    const deletePhoto = (index: string) => {
        updateGame({ ...game, photos: game.photos.filter(photo => photo != index) })
    };

    return (
        <div>
            <label className="font-bold text-gray-800 mr-3">Obrázky</label>
            {game.photos.map((photo, index) =>
                <div key={index} className="flex flex-row items-center justify-between w-full mt-3">
                    <input
                        className="w-11/12 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={photo}
                        onChange={(event) => updatePhoto(index, event.target.value)}
                    />
                    <button
                        type="button"
                        className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                        onClick={() => deletePhoto(photo)}
                    >
                        X
                    </button>
                </div>
            )}
            <button
                type="button"
                className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-800 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                onClick={addPhoto}
            >
                Přidat obrázek
            </button>
        </div>

    )
}

export const EditGameVideos: React.FC<EditGameProps> = ({ game, updateGame }) => {
    const addVideo = () => {
        updateGame({ ...game, videos: [...game.videos, ""] })
    };

    const updateVideo = (index: number, newVideoUrl: string) => {
        updateGame({ ...game, videos: game.videos.map((video, i) => i === index ? newVideoUrl : video) })
    };

    const deleteVideo = (index: number) => {
        updateGame({ ...game, videos: game.videos.filter((_, i) => i !== index) })
    };

    return (
        <div>
            <label className="font-bold text-gray-800 mr-3">Videa</label>
            {game.videos.map((video, index) =>
                <div key={index} className="flex flex-row items-center justify-between w-full mt-3">
                    <input
                        className="w-11/12 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        value={video}
                        onChange={(event) => updateVideo(index, event.target.value)}
                    />
                    <button
                        type="button"
                        className="ml-3 px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                        onClick={() => deleteVideo(index)}
                    >
                        X
                    </button>
                </div>
            )}
            <button
                type="button"
                className="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-800 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                onClick={addVideo}
            >
                Přidat video
            </button>
        </div>
    )
}

interface EditGameGenresProps {
    game: Game;
    updateGame: Function;
    genresList: Genre[];
}

export const EditGameGenres: React.FC<EditGameGenresProps> = ({ game, updateGame,  genresList}) => {
    const handleGenreChange = (genreId: string) => {
        const genreIds = game.genres.map(g => g.id);
        if (genreIds.includes(genreId)) {
            updateGame({ ...game, genres: game.genres.filter(g => g.id !== genreId) });
        }
        else {
            const newGenre = genresList.find(g => g.id == genreId);
            if (newGenre) {
                updateGame({ ...game, genres: [...game.genres, newGenre] });
                console.log(game.genres.length);
            }
        }
    };

    return (
        <div>
            <label className="font-bold text-gray-600">Žánry</label>
            <div className="grid grid-cols-2 md:grid-cols-3">
                {
                    genresList.map(genre =>
                        <div key={genre.id}>
                            {genre.name} <input
                                type="checkbox"
                                checked={game.genres.map(g => g.id).includes(genre.id)}
                                onChange={() => handleGenreChange(genre.id)}
                            />
                        </div>
                    )}
            </div>
        </div>
    )
}

interface EditGameDevelopersProps {
    game: Game;
    updateGame: Function;
    developers: Developer[];
}

export const EditGameDevelopers: React.FC<EditGameDevelopersProps> = ({ game, updateGame, developers }) => {
    const addDeveloper = () => {
        const newDev = developers.find(dev => dev.name == inputValue);
        if (newDev && !game.developers.map(d => d.id).includes(newDev.id)) {
            updateGame({ ...game, developers: [...game.developers, newDev] });
            developerNames.filter(devName => devName != newDev.name);
        }
        setInputValue("");
    }

    const deleteDeveloper = (id: string) => {
        updateGame({ ...game, developers: game.developers.filter(dev => dev.id != id) })
        const devName = developers.find(dev => dev.id == id)?.name;
        if (devName) {
            developerNames.push(devName);
        }
    }

    const developerNames = developers.filter(dev => !game.developers.map(d => d.id).includes(dev.id)).map(developer => developer.name);

    const [inputValue, setInputValue] = useState("");
    const [suggestion, setSuggestion] = useState("");

    useEffect(() => {
        const matchingSuggestion = developerNames.find(name => name.toLowerCase().startsWith(inputValue.toLowerCase()));
        setSuggestion(matchingSuggestion || "");
    }, [inputValue, developerNames]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && suggestion) {
            e.preventDefault();
            setInputValue(suggestion);
        }
    };

    return (
        <div>
            <label className="font-bold text-gray-600">Vývojáři</label>
            <div className="grid sm:grid-cols-2 md:grid-cols-3">
                {game.developers.map(dev => (
                    <div key={dev.id}>
                        {developers.find(d => d.id === dev.id)?.name}
                        <button
                            type="button"
                            className="ml-5 mt-3 px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                            onClick={() => deleteDeveloper(dev.id)}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>
            <div className="relative w-64 mt-4">
                <input
                    type="text"
                    value={suggestion}
                    id="newDeveloperSuggestion"
                    disabled
                    className="absolute w-full z-1 bg-white text-gray-300 flex-grow px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-5"
                />
                <input
                    type="text"
                    value={inputValue}
                    id="newDeveloper"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="absolute z-2 bg-transparent text-black w-full flex-grow px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-5"
                />
            </div>
            <div className="mt-10">
                <button
                    onClick={addDeveloper}
                    type="button"
                    className="mt-8 px-4 py-1 text-white rounded-md bg-gray-600 hover:bg-gray-800 transition-colors duration-200"
                >
                    Přidat vývojáře
                </button>
            </div>
        </div>
    )
}