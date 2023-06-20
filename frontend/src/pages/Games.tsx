import { useState } from 'react';
import { GameItem } from '../components/GameItem';
import { useLocation } from 'react-router-dom';
import { Developer, Game, Genre } from '../models';
import { DeveloperApi, GameApi, GenreApi } from '../services';
import { useQuery } from '@tanstack/react-query';

export const Games = () => {
  const { data: games } = useQuery<Game[]>(['games'], GameApi.retrieveAllGames);
  const { data: developers } = useQuery<Developer[]>(['developers'], DeveloperApi.retrieveAllDevelopers);
  const { data: genres } = useQuery<Genre[]>(['genres'], GenreApi.retrieveAllGenres);

  if (!games || !developers || !genres) {
    return (
    <div>Fetching error</div>
    );
  }

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const genre = queryParams.get('genre');

  const [filter, setFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [developerFilter, setDeveloperFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState(genre || '');
  const [sortType, setSortType] = useState('name-asc');

  let filteredGames = games.filter(game => {
    const matchesName = game.name.toLowerCase().includes(filter.toLowerCase());
    const matchesYear = game.releaseDate.includes(yearFilter);
    const matchesDeveloper = developerFilter === '' || game.developers.map(d => d.id).includes(developerFilter);
    const matchesGenre = genreFilter === '' || game.genres.map(g => g.id).includes(genreFilter);
    return matchesName && matchesYear && matchesDeveloper && matchesGenre;
  });

  filteredGames.sort((a, b) => {
    let result = 0;
  
    switch (sortType) {
      case 'name-asc':
        result = a.name.localeCompare(b.name);
        break;
      case 'name-desc':
        result = b.name.localeCompare(a.name);
        break;
      case 'year-asc':
        result = a.releaseDate.localeCompare(b.releaseDate);
        break;
      case 'year-desc':
        result = b.releaseDate.localeCompare(a.releaseDate);
        break;
      case 'rating-asc':
        result = a.rating - b.rating;
        break;
      case 'rating-desc':
        result = b.rating - a.rating;
        break;
      default:
        result = 0;
    }
  
    return result;
  });
  

  return (
    <div>
      <div className="p-4 bg-white shadow rounded-lg mb-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          <input
            type="text"
            placeholder="Jméno hry"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded"
          />
          <select
            value={developerFilter}
            onChange={e => setDeveloperFilter(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded"
          >
            <option value="">Všichni vývojáři</option>
            {developers.map(dev => (
              <option key={dev.id} value={dev.id}>{dev.name}</option>
            ))}
          </select>
          <select
            value={genreFilter}
            onChange={e => setGenreFilter(e.target.value)}
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
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded"
          />
          <select
            value={sortType}
            onChange={e => setSortType(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded"
          >
            <option value="name-asc">Abecedně (A-Z)</option>
            <option value="name-desc">Abecedně (Z-A)</option>
            <option value="year-asc">Datum vydání (od nejstarších)</option>
            <option value="year-desc">Datum vydání (od nejnovějších)</option>
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
