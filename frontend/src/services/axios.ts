
import axios, { AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}`,
});


axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          alert(`${error.response.massage}`);
          break;
        case 404:
          window.location.href = '*';
          break;
        case 500:
          alert(`${error.response.massage}`);
          break;
        default:
          alert(`${error.response.massage}`);
      }
    } else {
      alert(error.response.massage);
    }
  }
);
