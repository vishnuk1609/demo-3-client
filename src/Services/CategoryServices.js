import { axiosInstance } from "../Axios/AxiosInstance";

export const getAllCategory = () => axiosInstance.get("/category");

export const createNewCategory = (data) => {
    return axiosInstance.post("/category/create", data);
};

export const editCategory = (catId, data) => {
    return axiosInstance.put(`/category/edit/${catId}`, data);
};

export const deleteCategory = (catId) => {
    return axiosInstance.delete(`/category/delete/${catId}`);
};
