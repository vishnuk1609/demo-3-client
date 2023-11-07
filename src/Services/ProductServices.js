import { axiosInstance } from "../Axios/AxiosInstance";

export const getAllProducts = () => axiosInstance.get("/products");

export const addNewProduct = (data) => {
    return axiosInstance.post("/products/add", data);
};

export const editProduct = (prodId, data) => {
    return axiosInstance.put(`/products/edit/${prodId}`, data);
};

export const deleteProduct = (prodId) => {
    return axiosInstance.delete(`/products/delete/${prodId}`);
};
    