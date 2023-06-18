import axiosInstance from "./base";

export const login = async (username: string, password: string) => { 
    await axiosInstance.post('/auth', { username, password });
}

export const auth = async () => {
    const resp = await axiosInstance.get('/auth', {});
    return resp.data;
}

export const logout = async () => {
    console.log("LogOut1");
    await axiosInstance.delete('/auth', {});
    console.log("LogOut2");
}