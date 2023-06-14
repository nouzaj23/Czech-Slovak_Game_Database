import axios from 'axios';
// import * as process from 'process';
// import { config as configEnv } from 'dotenv';

//configEnv();

const axiosInstance = axios.create({
    baseURL: 'https://cshd.gwenlian.eu/api/',
    // baseURL: process.env.BE_HOST,
    headers: {
        "Access-Control-Allow-Credentials": true,
    },
    withCredentials: true
});

export default axiosInstance;