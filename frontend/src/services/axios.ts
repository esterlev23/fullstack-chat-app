
import axios, { AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}/api`,
});


axiosInstance.interceptors.response.use(
    async (response: AxiosResponse) => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    alert(error.message || 'Bad Request');
                    break;
                case 404:
                    alert(error.message || 'Page not found');
                    break;
                case 500:
                    alert('Server Error');
                    break;
                default:
                    alert('Unexpected Error');
            }
        } else {
            alert('No server response');
        }
        return Promise.reject(error);
    }
);
