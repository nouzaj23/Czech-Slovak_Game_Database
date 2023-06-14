import axiosInstance from "./base";

export const add = async (name: string, description: string, releaseDate: string, developers: string[],
    genres: string[], cover: string, photos: string[], videos: string[]) => {
    const response = await axiosInstance.post('/game', {
        name,
        description,
        releaseDate,
        developers,
        genres,
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

export const retrieveGame = async (id: string) => {
    const response = await axiosInstance.get(`/game/${id}`);
    return response.data;
}

export const update = async (id: string, name: string, description: string, releaseDate: string, developers: string[],
    genres: string[], cover: string, photos: string[], videos: string[]) => {
    const response = await axiosInstance.patch(`/game/${id}`, {
        name,
        description,
        releaseDate,
        developers,
        genres,
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

export const addReview = async (title: string, text: string, rating: number, gameId: string, userId: string, date: string) => {
    const response = await axiosInstance.post(`/game/${gameId}/review`, {
        title,
        text,
        rating,
        gameId,
        userId,
        date,
    });
    return response.data;
}

export const updateReview = async (reviewId: string, title: string, text: string, rating: number, gameId: string, userId: string, date: string) => {
    const response = await axiosInstance.patch(`/game/${gameId}/review/${reviewId}`, {
        title,
        text,
        rating,
        gameId,
        userId,
        date,
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

export const addComment = async (content: string, userId: string, gameId: string, date: string) => {
    const response = await axiosInstance.post(`/game/${gameId}/comment`, {
        content,
        userId,
        gameId,
        date,
    });
    return response.data;
}

export const updateComment = async (commentId: string, content: string, userId: string, gameId: string, date: string) => {
    const response = await axiosInstance.patch(`/game/${gameId}/comment/${commentId}`, {
        content,
        userId,
        gameId,
        date,
    });
    return response.data;
}

export const deleteComment = async (commentId: string, gameId: string) => {
    const response = await axiosInstance.delete(`/game/${gameId}/comment/${commentId}`);
    return response.data;
}