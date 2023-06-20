import { Developer, Genre, Review, Comment } from ".";

export interface Game {
    id: string;
    name: string;
    description: string;
    rating: number;
    releaseDate: string;
    developers: Developer[];
    genres: Genre[];
    reviews: Review[];
    comments: Comment[]; 
    cover: string;
    photos: string[];
    videos: string[];
}