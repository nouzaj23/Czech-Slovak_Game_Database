import axiosInstance from "./base";

export const register = async (username: string, password: string, email: string) => {
    const response = await axiosInstance.post('/user', {
        username,
        password,
        email,
    });
    return response.data;
}

export const retrieve = async (id: string) => {
    const response = await axiosInstance.get(`/user/${id}`);
    return response.data;
}

export const retrieveAllUsers = async () => {
    const response = await axiosInstance.get(`/user`);
    return response.data;
}

export const update = async (id: string, username: string, avatar: string) => {
    const response = await axiosInstance.patch(`/user/${id}`, {
        username,
        avatar,
    });
    return response.data;
}

export const remove = async (id: string) => {
    const response = await axiosInstance.delete(`/user/${id}`);
    return response.data;
}

export const authenticate = async (id: string) => {
    const response = await axiosInstance.get(`/user/${id}/auth`);
    return response.data;
}

export const updateAuth = async (id: string, password: string, newPassword: string, email: string) => {
    const response = await axiosInstance.patch(`/user/${id}/auth`, {
        password,
        newPassword,
        email,
    });
    return response.data;
}

export const getWishlist = async (id: string) => {
    const response = await axiosInstance.get(`/user/${id}/wishlist`);
    return response.data;
}

export const addToWishlist = async (userId: string, gameId: string) => {
    const response = await axiosInstance.post(`/user/${userId}/wishlist`, {
        userId,
        gameId,
    });
    return response.data;
}

export const removeFromWishlist = async (userId: string, gameId: string) => {
    const response = await axiosInstance.delete(`/user/${userId}/wishlist/${gameId}`);
    return response.data;
}