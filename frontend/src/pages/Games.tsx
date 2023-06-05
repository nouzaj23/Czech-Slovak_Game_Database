import { useState } from 'react';
import games from '../assets/games.json';
import developers from '../assets/developers.json';
import genres from '../assets/genres.json';
import reviews from '../assets/reviews.json';
import { GameItem } from '../components/GameItem';
import { useLocation } from 'react-router-dom';

export const Games = () => {
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
    const matchesDeveloper = developerFilter === '' || game.developers.includes(developerFilter);
    const matchesGenre = genreFilter === '' || game.genres.includes(genreFilter);
    return matchesName && matchesYear && matchesDeveloper && matchesGenre;
  });

  filteredGames.sort((a, b) => {
    if (sortType === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortType === 'name-desc') {
      return b.name.localeCompare(a.name);
    } else if (sortType === 'year-asc') {
      return a.releaseDate.localeCompare(b.releaseDate);
    } else if (sortType === 'year-desc') {
      return b.releaseDate.localeCompare(a.releaseDate);
    } else if (sortType === 'rating-asc') {
      const aReviews = reviews.filter(review => review.game === a.id);
      const bReviews = reviews.filter(review => review.game === b.id);
      const aAverageRating = aReviews.reduce((total, review) => total + review.rating, 0) / aReviews.length;
      const bAverageRating = bReviews.reduce((total, review) => total + review.rating, 0) / bReviews.length;
      return aAverageRating - bAverageRating;
    } else if (sortType === 'rating-desc') {
      const aReviews = reviews.filter(review => review.game === a.id);
      const bReviews = reviews.filter(review => review.game === b.id);
      const aAverageRating = aReviews.reduce((total, review) => total + review.rating, 0) / aReviews.length;
      const bAverageRating = bReviews.reduce((total, review) => total + review.rating, 0) / bReviews.length;
      return bAverageRating - aAverageRating;
    } else {
      return 0;
    }
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
              <option key={gen.id} value={gen.id}>{gen.type}</option>
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

      <div className="grid grid-cols-3 gap-4 p-4">
        {filteredGames.map(game => (
          <GameItem
            key={game.id}
            game={game}
            developers={developers}
            genres={genres}
            reviews={reviews.filter(review => review.game === game.id)}
          />
        ))}
      </div>
    </div>
  );
};
