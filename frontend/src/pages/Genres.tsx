import { Link } from "react-router-dom";
import { Genre } from "../models";
import { GenreApi } from "../services";
import { useQuery } from "@tanstack/react-query";

export const Genres = () => {
  const { data: genresData } = useQuery<Genre[]>(['genres'], GenreApi.retrieveAllGenres);
  const genres = genresData ?? [];

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <div className="flex flex-wrap">
        {genres.map(genre => (
          <Link to={`/games?genre=${genre.id}`} key={genre.id} className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="flex flex-col justify-between bg-gray-200 rounded-lg p-4 hover:bg-gray-300 transition-colors duration-300 ease-in-out cursor-pointer h-full">
              <h2 className="font-bold text-xl mb-2">{genre.name}</h2>
              <p className="flex-grow">{genre.description.length > 100 ? `${genre.description.substring(0, 100)}...` : genre.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
