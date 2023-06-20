import { Developer, Genre } from ".";

export interface Game {
    id: string;
    name: string;
    description: string;
    rating: number;
    releaseDate: string;
    developers: Developer[];
    genres: Genre[]; // Genre IDs
    reviews: string[]; // Review IDs
    comments: string[]; // Comment IDs
    cover: string;
    photos: string[];
    videos: string[];
}