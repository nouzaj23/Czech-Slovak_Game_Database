import { selector } from 'recoil';
import { Game } from '../models';
import { gamesAtom } from './atoms';

export const recentGamesSelector = selector<Game[]>({
    key: 'recentGames',
    get: ({ get }) => {
      const games = get(gamesAtom);
      const sortedGames = [...games].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
      return sortedGames.slice(0, 4);
    }
  });