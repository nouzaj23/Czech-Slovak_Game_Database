import { Game } from ".";
import { User } from ".";

export interface Comment {
    id: string;
    content: string;
    user: User;
    game: Game;
    createdAt: string;
}