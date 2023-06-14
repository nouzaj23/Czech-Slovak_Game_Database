// import { User } from "../models/user";
// import { ResponseSingle } from "../models/response";
import axiosInstance from "./base";

const USER = 'admin';
const PASSWORD = 'admin';

export const login = async () => { 
    await axiosInstance.post('/auth', { username: USER, password: PASSWORD });
}

export const auth = async () => {
    const resp = await axiosInstance.get('/auth', {});
    return resp.data;
}

export const logout = async () => {
    await axiosInstance.delete('/auth', {});
}