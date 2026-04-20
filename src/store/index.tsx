import Service from "@/service";
import { AxiosResponse } from "axios";

interface ApiResponse<T = any> {
    data: T;
    status: boolean;
    message?: string;
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