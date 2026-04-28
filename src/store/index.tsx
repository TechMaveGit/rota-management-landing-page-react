import Service from "@/service";
import { AxiosResponse } from "axios";

interface ApiResponse<T = any> {
    data: T;
    status: boolean;
    message?: string;
    clientSecret?: string;
}
export const getPlan = async (callBack: (status: number, response: AxiosResponse<ApiResponse>) => void,
    callBackError: (error: any) => void): Promise<void> => {
    try {
        await Service.get<ApiResponse>(`plans`, (status, response) => {
            callBack(status, response);
        });
    } catch (error) {
        callBackError(error);
    }
};


export const createAccount = async (payload: any, callBack: (response: AxiosResponse<ApiResponse>) => void,
    callBackError: (error: any) => void): Promise<void> => {
    try {
        await Service.post<ApiResponse>("onboarding/create-account", payload, (response) => {
            callBack(response);
        });
    } catch (error) {
        callBackError(error);
    }
};

export const paymentIntent = async (payload: any, callBack: (response: AxiosResponse<ApiResponse>) => void,
    callBackError: (error: any) => void): Promise<void> => {
    try {
        await Service.post<ApiResponse>("transaction/create", payload, (response) => {
            callBack(response);
        });
    } catch (error) {
        callBackError(error);
    }
};


export const activateFreePlan = async (payload: any, callBack: (response: AxiosResponse<ApiResponse>) => void,
    callBackError: (error: any) => void): Promise<void> => {
    try {
        await Service.post<ApiResponse>("onboarding/activate-free-plan", payload, (response) => {
            callBack(response);
        });
    } catch (error) {
        callBackError(error);
    }
};