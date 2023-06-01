export interface Game {
    id: string;
    name: string;
    description: string;
    releaseDate: string;
    developers: string[]; // Developer IDs
    genres: string[]; // Genre IDs
    reviews: string[]; // Review IDs
    comments: string[]; // Comment IDs
    cover: string;
    photos: string[];
    videos: string[];
}