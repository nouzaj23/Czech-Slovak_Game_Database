import { Game } from ".";

export interface Developer {
    id: string;
    name: string;
    description: string;
    avatar: string;
    games: Game[];
}