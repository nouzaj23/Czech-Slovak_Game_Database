import { atom } from 'recoil';
import { Developer, Game, Genre } from '../models';

export const gamesAtom = atom<Game[]>({
    key: 'games',
    default: [],
});

export const genresAtom = atom<Genre[]>({
    key: 'genres',
    default: [],
});

export const developersAtom = atom<Developer[]>({
    key: 'developers',
    default: [],
});