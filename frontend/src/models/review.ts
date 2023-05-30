import { Game, User } from ".";

export interface Review {
    id: string;
    title: string;
    text: string;
    rating: number;
    game: Game;
    user: User;
    createdAt: Date;
}