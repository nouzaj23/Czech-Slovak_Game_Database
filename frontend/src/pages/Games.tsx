import { useEffect, useState } from 'react';
// import games from '../assets/games.json';
// import developers from '../assets/developers.json';
// import genres from '../assets/genres.json';
import reviews from '../assets/reviews.json';
import { GameItem } from '../components/GameItem';
import { useLocation } from 'react-router-dom';
import { Developer, Game, Genre } from '../models';
import { DeveloperApi, GameApi, GenreApi } from '../services';

export const Games = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const loadedGames = await GameApi.retrieveAllGames();
            setGames(loadedGames);
            setDevelopers(await DeveloperApi.retrieveAllDevelopers());
            setGenres(await GenreApi.retrieveAllGenres());
        }
        catch (error) {
            console.log("Games was not loaded");
        }
    }
    fetchData();
}, []);

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
    let result = 0;
  
    const getAverageRating = (gameId: string) => {
      const gameReviews = reviews.filter(review => review.game === gameId);
      return gameReviews.reduce((total, review) => total + review.rating, 0) / gameReviews.length;
    };
  
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
        result = getAverageRating(a.id) - getAverageRating(b.id);
        break;
      case 'rating-desc':
        result = getAverageRating(b.id) - getAverageRating(a.id);
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
            developers={developers}
            genres={genres}
            reviews={reviews.filter(review => review.game === game.id)}
          />
        ))}
      </div>
    </div>
  );
};
