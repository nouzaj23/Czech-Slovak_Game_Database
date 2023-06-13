import axios from 'axios';
import * as process from 'process';
import { config as configEnv } from 'dotenv';

configEnv();

const axiosInstance = axios.create({
    baseURL: process.env.BE_HOST,
});

export default axiosInstance;