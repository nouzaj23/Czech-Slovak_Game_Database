import axiosInstance from "./base";

export const add = async (name: string, description: string, avatar:string) => {
    const response = await axiosInstance.post('/developer', {
        name,
        description,
        avatar
    });
    return response.data;
}

export const retrieveAllDevelopers = async () => {
    const response = await axiosInstance.get(`/developer`);
    return response.data;
}

export const retrieveDeveloper = async (id: string) => {
    const response = await axiosInstance.get(`/developer/${id}`);
    return response.data;
}

export const update = async (id: string, name: string, description: string, avatar:string, games:string[]) => {
    const response = await axiosInstance.put(`/developer/${id}`, {
        name,
        description,
        avatar,
        games
    });
    return response.data;
}

export const remove = async (id: string) => {
    const response = await axiosInstance.delete(`/developer/${id}`);
    return response.data;
}
