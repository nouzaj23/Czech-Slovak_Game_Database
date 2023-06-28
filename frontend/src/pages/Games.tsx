import { GameItem } from '../components/GameItem';
import { useSearchParams } from 'react-router-dom';
import { Developer, Game, Genre } from '../models';
import { DeveloperApi, GameApi, GenreApi } from '../services';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export const Games = () => {
  const [searchParams] = useSearchParams();
  const genre = searchParams.get('genre');

  const { register, watch } = useForm({
    defaultValues: {
      nameFilter: '',
      developerFilter: '',
      genreFilter: genre ?? '',
      dateFilter: '',
      sortType: 'name-asc'
    }
  });

  const filters = watch();

  const { data: gamesData } = useQuery<Game[]>(['games'], GameApi.retrieveAllGames);
  const { data: developersData } = useQuery<Developer[]>(['developers'], DeveloperApi.retrieveAllDevelopers);
  const { data: genresData } = useQuery<Genre[]>(['genres'], GenreApi.retrieveAllGenres);

  const games = gamesData ?? [];
  const developers = developersData ?? [];
  developers.sort((a, b) => a.name.localeCompare(b.name));
  const genres = genresData ?? [];
  genres.sort((a, b) => a.name.localeCompare(b.name));

  let filteredGames = games.filter(game => {
    const matchesName = game.name.toLowerCase().includes(filters.nameFilter.toLowerCase());
    const matchesDate = game.releaseDate.includes(filters.dateFilter);
    const matchesDeveloper = filters.developerFilter === '' || game.developers.map(d => d.id).includes(filters.developerFilter);
    const matchesGenre = filters.genreFilter === '' || game.genres.map(g => g.id).includes(filters.genreFilter);
    return matchesName && matchesDate && matchesDeveloper && matchesGenre;
  });

  filteredGames.sort((a, b) => {
    const sortType = filters.sortType;
    if (sortType === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (sortType === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    if (sortType === 'date-asc') {
      return a.releaseDate.localeCompare(b.releaseDate);
    }
    if (sortType === 'date-desc') {
      return b.releaseDate.localeCompare(a.releaseDate);
    }
    if (sortType === 'rating-asc') {
      return a.rating - b.rating;
    }
    if (sortType === 'rating-desc') {
      return b.rating - a.rating;
    }
    return 0;
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
    <div>
      <div className="p-4 bg-white shadow rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <input
            type="text"
            placeholder="Jméno hry"
            {...register('nameFilter')}
            className="p-2 border-2 border-gray-300 rounded"
          />
          <select
            {...register('developerFilter')}
            className="p-2 border-2 border-gray-300 rounded"
          >
            <option value="">Všichni vývojáři</option>
            {developers.map(dev => (
              <option key={dev.id} value={dev.id}>{dev.name}</option>
            ))}
          </select>
          <select
            {...register('genreFilter')}
            className="p-2 border-2 border-gray-300 rounded"
          >
            <option value="">Všechny žánry</option>
            {genres.map(gen => (
              <option key={gen.id} value={gen.id}>{gen.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Datum vydání (YYYY-MM-DD)"
            {...register('dateFilter')}
            className="p-2 border-2 border-gray-300 rounded"
          />
          <select
            {...register('sortType')}
            className="p-2 border-2 border-gray-300 rounded"
          >
            <option value="name-asc">Abecedně (A-Z)</option>
            <option value="name-desc">Abecedně (Z-A)</option>
            <option value="date-asc">Datum vydání (od nejstarších)</option>
            <option value="date-desc">Datum vydání (od nejnovějších)</option>
            <option value="rating-asc">Hodnocení (od nejhorších)</option>
            <option value="rating-desc">Hodnocení (od nejlepších)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredGames.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(game => (
          <GameItem
            key={game.id}
            game={game}
          />
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
          className={`px-4 py-2 mr-5 text-white bg-gray-600 hover:bg-gray-800 rounded rounded-md ${filteredGames.length <= (page + 1) * itemsPerPage && 'opacity-50 cursor-not-allowed'}`}
          disabled={filteredGames.length <= (page + 1) * itemsPerPage}
        >
          Další
        </button>
      </div>
    </div>
  );
};
