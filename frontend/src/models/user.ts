export interface User {
    id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
    reviews: string[]; // Review IDs
    comments: string[]; // Comment IDs
    wishlist: string[]; // Game IDs
}