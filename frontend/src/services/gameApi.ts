import { Developer, Genre } from "../models";
import axiosInstance from "./base";

export const add = async (name: string, description: string, releaseDate: string, developers: Developer[],
    genres: Genre[], cover: string, photos: string[], videos: string[]) => {
    const response = await axiosInstance.post('/game', {
        name,
        description,
        genres,
        releaseDate,
        developers,
        cover,
        photos,
        videos
    });
    return response.data;
}

export const retrieveAllGames = async () => {
    const response = await axiosInstance.get(`/game`);
    return response.data;
}

export const retrieveGamesByName = async (nameContains: string) => {
    const response = await axiosInstance.get(`/game`, {
        params: {
            nameContains,
        }
    });
    return response.data;
}

export const retrieveGamesByDeveloper = async (developerId: string) => {
    const response = await axiosInstance.get(`/game`, {
        params: {
            developerId,
        }
    });
    return response.data;
}

export const retrieveGame = async (id: string) => {
    const response = await axiosInstance.get(`/game/${id}`);
    return response.data;
}

export const update = async (id: string, name: string, description: string, releaseDate: string, developerIds: string[],
    genreIds: string[], cover: string, photos: string[], videos: string[]) => {
    const response = await axiosInstance.patch(`/game/${id}`, {
        name,
        description,
        genreIds,
        releaseDate,
        developerIds,
        cover,
        photos,
        videos
    });
    return response.data;
}

export const remove = async (id: string) => {
    const response = await axiosInstance.delete(`/game/${id}`);
    return response.data;
}

export const retrieveGameReviews = async (id: string) => {
    const response = await axiosInstance.get(`/game/${id}/review`);
    return response.data
}

export const addReview = async (title: string, text: string, rating: number, gameId: string, userId: string) => {
    const response = await axiosInstance.post(`/game/${gameId}/review`, {
        userId,
        rating,
        text,
        title,
        gameId,
    });
    return response.data;
}

export const updateReview = async (reviewId: string, title: string, text: string, rating: number, gameId: string) => {
    const response = await axiosInstance.patch(`/game/${gameId}/review/${reviewId}`, {
        rating,
        title,
        text,
    });
    return response.data;
}

export const deleteReview = async (reviewId: string, gameId: string) => {
    const response = await axiosInstance.delete(`/game/${gameId}/review/${reviewId}`);
    return response.data;
}

export const retrieveGameComments = async (id: string) => {
    const response = await axiosInstance.get(`/game/${id}/comment`);
    return response.data
}

export const addComment = async (content: string, userId: string, gameId: string) => {
    const response = await axiosInstance.post(`/game/${gameId}/comment`, {
        userId,
        gameId,
        content,
    });
    return response.data;
}

export const updateComment = async (commentId: string, content: string, gameId: string) => {
    const response = await axiosInstance.patch(`/game/${gameId}/comment/${commentId}`, {
        content,
    });
    return response.data;
}

export const deleteComment = async (commentId: string, gameId: string) => {
    const response = await axiosInstance.delete(`/game/${gameId}/comment/${commentId}`);
    return response.data;
}

export const addDeveloper = async (developerId: string, gameId: string) => {
    const response = await axiosInstance.post(`/game/${gameId}/developer`, {
        developerId,
    });
    return response.data;
}

export const removeDeveloper = async (developerId: string, gameId: string) => {
    const response = await axiosInstance.delete(`/game/${gameId}/developer/${developerId}`);
    return response.data;
}