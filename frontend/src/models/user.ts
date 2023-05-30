import { Game, Review } from ".";

export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
    reviews: Review[];
    comments: Comment[];
    wishlist: Game[];
}