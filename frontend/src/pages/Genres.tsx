import { Link } from "react-router-dom";
import genres from '../assets/genres.json';

export const Genres = () => {
  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <div className="flex flex-wrap -m-4">
        {genres.map(genre => (
          <Link to={`/games?genre=${genre.id}`} key={genre.id} className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="flex flex-col justify-between bg-gray-200 rounded-lg p-4 hover:bg-gray-300 transition-colors duration-300 ease-in-out cursor-pointer h-full">
              <h2 className="font-bold text-xl mb-2">{genre.type}</h2>
              <p className="flex-grow">{genre.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
