import { Game } from "./game";
import { User } from "./user";

export interface Review {
    id: string;
    title: string;
    text: string;
    rating: number;
    game: Game;
    user: User;
    createdAt: string;
}