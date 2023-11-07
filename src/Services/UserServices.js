import { axiosInstance } from "../Axios/AxiosInstance";

export const signup = (data) => {
    return axiosInstance.post("/auth/signup", data);
};

export const login = (data) => {
    return axiosInstance.post("/auth/signin", data);
};
