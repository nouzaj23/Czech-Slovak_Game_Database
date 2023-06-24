import { GameItem } from '../components/GameItem';
import { useSearchParams } from 'react-router-dom';
import { Developer, Game, Genre } from '../models';
import { DeveloperApi, GameApi, GenreApi } from '../services';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export const Games = () => {
  const [searchParams, setSearchParams ] = useSearchParams();
  const name = searchParams.get('name');
  const developer = searchParams.get('developer');
  const genre = searchParams.get('genre');
  const date = searchParams.get('date');
  const sort = searchParams.get('sort');

  const { register, watch } = useForm({
    defaultValues: {
      nameFilter: name ?? '',
      developerFilter: developer ?? '',
      genreFilter: genre ?? '',
      dateFilter: date ?? '',
      sortType: sort ?? 'name-asc'
    }
  });

  const filter = watch();

  useEffect(() => {
    setSearchParams({
      name: filter.nameFilter,
      developer: filter.developerFilter,
      genre: filter.genreFilter,
      date: filter.dateFilter,
      sort: filter.sortType
    });
  }, [filter, setSearchParams]);

  const { data: gamesData } = useQuery<Game[]>(['games'], GameApi.retrieveAllGames);
  const { data: developersData } = useQuery<Developer[]>(['developers'], DeveloperApi.retrieveAllDevelopers);
  const { data: genresData } = useQuery<Genre[]>(['genres'], GenreApi.retrieveAllGenres);

  const games = gamesData ?? [];
  const developers = developersData ?? [];
  developers.sort((a, b) => a.name.localeCompare(b.name));
  const genres = genresData ?? [];
  genres.sort((a, b) => a.name.localeCompare(b.name));

  let filteredGames = games.filter(game => {
    const matchesName = game.name.toLowerCase().includes(filter.nameFilter.toLowerCase());
    const matchesDate = game.releaseDate.includes(filter.dateFilter);
    const matchesDeveloper = filter.developerFilter === '' || game.developers.map(d => d.id).includes(filter.developerFilter);
    const matchesGenre = filter.genreFilter === '' || game.genres.map(g => g.id).includes(filter.genreFilter);
    return matchesName && matchesDate && matchesDeveloper && matchesGenre;
  });

  filteredGames.sort((a, b) => {
    const sortType = filter.sortType;
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
        {filteredGames.map(game => (
          <GameItem
            key={game.id}
            game={game}
          />
        ))}
      </div>
    </div>
  );
};
