import { User } from ".";

export interface Comment {
    id: string;
    content: string;
    commenter: User;
    gameId: string; // Game ID
    createdAt: string;
}