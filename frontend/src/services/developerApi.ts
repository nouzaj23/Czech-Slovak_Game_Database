import axiosInstance from "./base";

export const add = async (name: string, description: string, avatar: string) => {
    const response = await axiosInstance.post('/developer', {
        name,
        description,
        avatar,
        isStudio: true
    });
    return response.data;
}

export const retrieveAllDevelopers = async () => {
    const response = await axiosInstance.get(`/developer`);
    return response.data;
}

export const retrieveDevelopersByName = async (nameContains: string) => {
    const response = await axiosInstance.get(`/developer`, {
        params: {
            nameContains,
        }
    });
    return response.data;
}

export const retrieveDeveloper = async (id: string) => {
    const response = await axiosInstance.get(`/developer/${id}`);
    return response.data;
}

export const update = async (id: string, name: string, description: string, avatar: string) => {
    const response = await axiosInstance.patch(`/developer/${id}`, {
        name,
        description,
        avatar,
        isStudio: true
    });
    return response.data;
}

export const remove = async (id: string) => {
    const response = await axiosInstance.delete(`/developer/${id}`);
    return response.data;
}
