export interface Review {
    id: string;
    title: string;
    text: string;
    rating: number;
    game: string; // Game ID
    user: string; // User ID
    createdAt: string;
}