// import { User } from "../models/user";
// import { ResponseSingle } from "../models/response";
import axiosInstance from "./base";

export const login = async (username: string, password: string) => {
    await axiosInstance.post('/auth', { username, password });
}

export const auth = async () => {
    const resp = await axiosInstance.get('/auth', {});
    return resp.data;
}

export const logout = async () => {
    try {
        await axiosInstance.delete('/auth', {});
    } catch (error: any) {
        console.log("problem");
        if (error.response && error.response.status === 504) {
            console.log("Server didn't respond in time, but we'll continue as if the logout was successful.");
            return;
        }
        throw error;
    }
}