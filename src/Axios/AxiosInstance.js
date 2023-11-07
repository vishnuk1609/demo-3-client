import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

const createAxiosClient = (baseURL) => {
    const client = axios.create({
        baseURL,
        timeout: 5000,
        timeoutErrorMessage: "Request timeout.. Please try again later",
    });
    return client;
};

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName);
    if (authToken) {
        const modifiedReq = { ...req };
        modifiedReq.headers.Authorization = `Bearer ${authToken}`;
        return modifiedReq;
    }
    return req;
};

const axiosInstance = createAxiosClient(baseURL);

axiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "jwtToken");
    return modifiedReq;
});

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.data.statusCode === 401) {
            localStorage.removeItem("jwtToken");
        }
        return Promise.reject(error);
    }
);

export { axiosInstance };
