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
    const resp = await axiosInstance.delete('/auth', {});
    console.log(resp.status)
}