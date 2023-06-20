import axiosInstance from "./base";

export const add = async (name: string, description: string) => {
    const response = await axiosInstance.post('/genre', {
        name,
        description,
    });
    return response.data;
}

export const retrieveAllGenres = async () => {
    const response = await axiosInstance.get(`/genre`);
    return response.data;
}

export const retrieveGenresByName = async (nameContains: string) => {
    const response = await axiosInstance.get(`/genre`, {
        params: {
            nameContains,
        },
    });
    return response.data;
}


export const retrieveGenre = async (id: string) => {
    const response = await axiosInstance.get(`/genre/${id}`);
    return response.data;
}

export const update = async (id: string, name: string, description: string) => {
    const response = await axiosInstance.patch(`/genre/${id}`, {
        id,
        name,
        description,
    });
    return response.data;
}

export const remove = async (id: string) => {
    const response = await axiosInstance.delete(`/genre/${id}`);
    return response.data;
}