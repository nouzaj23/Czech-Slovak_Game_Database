import { User } from "../models/user";
import { ResponseSingle } from "../models/response";
import baseApi from "./base";

// const USER = 'inspector.lestrade@example.com';
const USER = 'sherlock.holmes@example.com';
const PASSWORD = 'sherlock';

export const login = async () => {
    const resp = await baseApi.post('/auth', { username: USER, password: PASSWORD });
    return resp.data;
}

export const auth = async () => {
    // return null;
    const user: User = { avatar: "", comments: [], createdAt: "1.1.2024",  email: "", id: "42", reviews: ["1"], username: "NeznamyUser", wishlist: ["1"]};
    const data: ResponseSingle<User> = { item: user, message: "ADMIN"};
    return data;
    // const resp = await baseApi.get<ResponseSingle<User>>('/auth', {});
    // return resp.data;
}

export const logout = async () => {
    const resp = await baseApi.delete<ResponseSingle<User>>('/auth', {});
    return resp.data;
}