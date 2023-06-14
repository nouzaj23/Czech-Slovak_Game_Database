// import { User } from "../models/user";
// import { ResponseSingle } from "../models/response";
import axiosInstance from "./base";

// const USER = 'admin';
// const PASSWORD = 'admin';

export const login = async (username: string, password: string) => { 
    await axiosInstance.post('/auth', { username, password });
}

export const auth = async () => {
    return null;
    const resp = await axiosInstance.get('/auth', {});
    return resp.data;
}

export const logout = async () => {
    await axiosInstance.delete('/auth', {});
}