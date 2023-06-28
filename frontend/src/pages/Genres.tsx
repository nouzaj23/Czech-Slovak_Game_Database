import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Genre } from "../models";
import { GenreApi } from "../services";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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

  const [page, setPage] = useState(0);

  const itemsPerPage = 6;

  const handleNextPage = () => {
    setPage(page + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <input
          type="text"
          placeholder="Jméno žánru"
          {...register('nameFilter')}
          className="p-2 border-2 border-gray-300 rounded"
        />

        <select
          {...register('sortType')}
          className="p-2 border-2 border-gray-300 rounded"
        >
          <option value="name-asc">Abecedně A-Z</option>
          <option value="name-desc">Abecedně Z-A</option>
        </select>
      </div>

      <div className="flex flex-wrap mt-4">
        {filteredGenres.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(genre => (
          <Link to={`/games?genre=${genre.id}`} key={genre.id} className="w-full sm:w-1/2 md:w-1/3 p-4">
            <div className="flex flex-col justify-between bg-gray-200 rounded-lg p-4 hover:bg-gray-300 transition-colors duration-300 ease-in-out cursor-pointer h-full">
              <h2 className="font-bold text-xl mb-2">{genre.name}</h2>
              <p className="flex-grow">{genre.description}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-between mt-4 pb-4">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 ml-5 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${page === 0 && 'opacity-50 cursor-not-allowed'}`}
          disabled={page === 0}
        >
          Předchozí
        </button>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 mr-5 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${filteredGenres.length <= (page + 1) * itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
          disabled={filteredGenres.length <= (page + 1) * itemsPerPage}
        >
          Další
        </button>
      </div>
    </div>
  );
};
