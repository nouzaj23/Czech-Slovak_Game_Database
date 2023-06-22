export interface Comment {
    id: string;
    content: string;
    commenterId: string; // User ID
    gameId: string; // Game ID
    createdAt: string;
}