import { Game } from "../../models";
import genresList from "../../assets/genres.json"
import { useEffect, useState } from "react";
import developers from "../../assets/developers.json"

interface EditGameProps {
    game: Game;
    updateGame: Function;
}

export const EditGameName: React.FC<EditGameProps> = ({ game, updateGame }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Game Name</label>
            <input
                type="text"
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={game.name}
                onChange={(event) => updateGame({ ...game, name: event.target.value })}
            />
        </div>
    )
}

export const EditGameDescribtion: React.FC<EditGameProps> = ({ game, updateGame }) => {
    return (
        <div>
            <label className="font-bold text-gray-800">Game Description</label>
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
            <label className="font-bold text-gray-800">Image</label>
            <input
                className="block w-full mt-1 px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                value={game.cover}
                onChange={(event) => updateGame({ ...game, cover: event.target.value })}
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
            <label className="font-bold text-gray-800 mr-3">Photos</label>
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
                Add photo
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
            <label className="font-bold text-gray-800 mr-3">Videos</label>
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
                Add video
            </button>
        </div>
    )
}

export const EditGameGenres: React.FC<EditGameProps> = ({ game, updateGame }) => {
    const [genres, setGenres] = useState(genresList);

    const handleGenreChange = (genreId: string) => {
        if (game.genres.includes(genreId)) {
            setGenres(genres.map(genre =>
                genre.id === genreId ? { ...genre, games: genre.games.filter(g => g != game.id) } : genre
            ));
            updateGame({ ...game, genres: game.genres.filter(g => g !== genreId) });
        }
        else {
            const newGenre = genresList.find(g => g.id == genreId);
            if (newGenre) {
                setGenres(genres.map(genre =>
                    genre.id === genreId ? { ...genre, games: [...genre.games, game.id] } : genre
                ));
                updateGame({ ...game, genres: [...game.genres, genreId] });
            }
        }
    };

    return (
        <div>
            <label className="font-bold text-gray-600">Genres</label>
            <div className="grid grid-cols-2 md:grid-cols-3">
                {
                    genres.map(genre =>
                        <div>
                            {genre.type} <input
                                type="checkbox"
                                checked={game.genres.includes(genre.id)}
                                onChange={() => handleGenreChange(genre.id)}
                            />
                        </div>
                    )}
            </div>
        </div>
    )
}

export const EditGameDevelopers: React.FC<EditGameProps> = ({ game, updateGame }) => {
    const addDeveloper = () => {
        const devName = (document.getElementById("newDeveloper") as HTMLInputElement);
        const newDev = developers.find(dev => dev.name == devName.value);
        if (newDev && !game.developers.includes(newDev.id)) {
            updateGame({ ...game, developers: [...game.developers, newDev.id] });
            developerNames.filter(devName => devName != newDev.name);
        }
        devName.value = "";
    }

    const deleteDeveloper = (id: string) => {
        updateGame({ ...game, developers: game.developers.filter(dev => dev != id) })
        const devName = developers.find(dev => dev.id == id)?.name;
        if (devName) {
            developerNames.push(devName);
        }
    }

    const developerNames = developers.filter(dev => !game.developers.includes(dev.id)).map(developer => developer.name);

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
            <label className="font-bold text-gray-600">Developers</label>
            <div className="grid grid-cols-2 md:grid-cols-3">
                {game.developers.map(dev => (
                    <div key={dev}>
                        {developers.find(d => d.id === dev)?.name}
                        <button
                            type="button"
                            className="ml-5 mt-3 px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                            onClick={() => deleteDeveloper(dev)}
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
                    disabled
                    className="absolute w-full z-1 text-gray-300 flex-grow px-4 py-2 border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-5"
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
                    onClick={() => addDeveloper()}
                    type="button"
                    className="mt-8 px-4 py-1 text-white rounded-md bg-gray-600 hover:bg-gray-800 transition-colors duration-200"
                >
                    Add Developer
                </button>
            </div>
        </div>
    )
}