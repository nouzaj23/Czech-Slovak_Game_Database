import { Developer, Genre, Review } from ".";

export interface Game {
    id: string;
    name: string;
    description: string;
    releaseDate: Date;
    developers: Developer[];
    genres: Genre[];
    reviews: Review[];
    comments: Comment[];
    cover: string;
    photos: string[];
    videos: string[];
}