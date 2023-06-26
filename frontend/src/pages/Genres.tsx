import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Genre } from "../models";
import { GenreApi } from "../services";
import { useQuery } from "@tanstack/react-query";

export const Genres = () => {
  const { register, watch } = useForm({ defaultValues: { nameFilter: '', sortType: 'name-asc' } });
  const watchAll = watch();

  const { data: genresData } = useQuery<Genre[]>(['genres'], GenreApi.retrieveAllGenres);
  const genres = genresData ?? [];

  let filteredGenres = genres.filter(genre => genre.name.toLowerCase().includes(watchAll.nameFilter.toLowerCase()));

  filteredGenres.sort((a, b) => {
    if (watchAll.sortType === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (watchAll.sortType === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else {
      return 0;
    }
  });

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <input
          type="text"
          placeholder="Genre Name"
          {...register('nameFilter')}
          className="p-2 border-2 border-gray-300 rounded"
        />

        <select
          {...register('sortType')}
          className="p-2 border-2 border-gray-300 rounded"
        >
          <option value="name-asc">Name Ascending</option>
          <option value="name-desc">Name Descending</option>
        </select>
      </div>

      <div className="flex flex-wrap mt-4">
        {filteredGenres.map(genre => (
          <Link to={`/games?genre=${genre.id}`} key={genre.id} className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="flex flex-col justify-between bg-gray-200 rounded-lg p-4 hover:bg-gray-300 transition-colors duration-300 ease-in-out cursor-pointer h-full">
              <h2 className="font-bold text-xl mb-2">{genre.name}</h2>
              <p className="flex-grow">{genre.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
