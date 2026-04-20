import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from "axios";

const baseUrl: string = import.meta.env.VITE_BASE_API_URL as string;

interface FailedQueueItem {
    resolve: (token: string | null) => void;
    reject: (error: AxiosError) => void;
}

// QUEUE HANDLING

let isRefreshing = false;
let failedQueue: FailedQueueItem[] = [];

const processQueue = (
    error: AxiosError | null,
    token: string | null = null
) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(token);
        }
    });

    failedQueue = [];
};

// REFRESH TOKEN API
const refreshToken = async (): Promise<string | null> => {
    const oldToken = localStorage.getItem("token");
    if (!oldToken) return null;

    try {
        const res: AxiosResponse<any> = await axios.post(
            `${baseUrl}/refresh-token`,
            { exp_token: oldToken },
            {
                headers: {
                    "Content-Type": "application/json",
                    token: oldToken,
                },
            }
        );

        if (res.data?.status == "true") {
            const newToken: string = res.data.user_token;
            localStorage.setItem("token", newToken);
            return newToken;
        }
    } catch (err) {
        console.error("Refresh token failed:", err);
    }

    return null;
};

// -----------------------------------------
// CREATE AXIOS INSTANCE
// -----------------------------------------
const createAxiosInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: baseUrl,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            Accept: "application/json",
        },
    });


    // REQUEST INTERCEPTOR
    instance.interceptors.request.use(
        (request) => {
            const token = localStorage.getItem("token");

            if (token) {
                request.headers?.set("Authorization", `Bearer ${token}`);
            }

            return request;
        },
        (error: AxiosError) => Promise.reject(error)
    );

    // RESPONSE INTERCEPTOR
    instance.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
                error.config || {};

            if (error.response?.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then((token) => {
                            if (originalRequest.headers && token) {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                            }
                            return instance(originalRequest);
                        })
                        .catch((err) => Promise.reject(err));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    const newToken = await refreshToken();
                    if (newToken) {
                        instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                        processQueue(null, newToken);
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        }
                        return instance(originalRequest);
                    } else {
                        processQueue(error, null);
                        throw error;
                    }
                } catch (err) {
                    processQueue(err as AxiosError, null);
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }
            return Promise.reject(error);
        }
    );
    return instance;
};

const axiosInstance = createAxiosInstance();
export const Service = {

    async get<T = any>(path: string, callback: (status: number, response: AxiosResponse<T>) => void) {
        const res = await axiosInstance.get<T>(path);
        return callback(res.status, res);
    },

    async post<T = any>(path: string, payload: any, callback: (response: AxiosResponse<T>) => void) {
        const res = await axiosInstance.post<T>(path, payload);
        return callback(res);
    },

    async delete<T = any>(path: string, id: string | number, callback: (response: AxiosResponse<T>) => void) {
        const res = await axiosInstance.delete<T>(`${path}/${id}`);
        return callback(res);
    },


    async put<T = any>(path: string, payload: any, callback: (response: AxiosResponse<T>) => void) {
        const res = await axiosInstance.put<T>(path, payload);
        return callback(res);
    },
    async putFile<T = any>(path: string, payload: any, callback: (response: AxiosResponse<T>) => void) {
        const res = await axiosInstance.put<T>(path, payload, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return callback(res);
    },

    async patch<T = any>(path: string, payload: any, callback: (response: AxiosResponse<T>) => void) {
        const res = await axiosInstance.patch<T>(path, payload);
        return callback(res);
    },

    async getPdf<T = any>(path: string, callback: (status: number, response: AxiosResponse<T>) => void, config: AxiosRequestConfig = {}) {
        const res = await axiosInstance.get<T>(path, { responseType: config.responseType || "json", ...config, });
        return callback(res.status, res);
    },

    async postFile<T = any>(path: string, payload: FormData, callback: (response: AxiosResponse<T>) => void) {
        const res = await axiosInstance.post<T>(path, payload, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return callback(res);
    },

    async postWithTokenHeader<T = any>(path: string, payload: any, callback: (response: AxiosResponse<T>) => void, headerName: string = "Token") {
        const token = localStorage.getItem("token") || "";
        const res = await axiosInstance.post<T>(path, payload, {
            headers: {
                [headerName]: token,
            },
        });
        return callback(res);
    },
};

export default Service;
