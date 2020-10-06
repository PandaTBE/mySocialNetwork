import axios from 'axios';

export const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "29aabadf-3d40-4ae6-8165-a5dfa9a9fe22"
    }
})
export type ResponseTypes<RS = ResultCodesEnum, D = {}> = {
    resultCode: RS
    messages: Array<string>
    data: D
}
export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    Captcha = 10
}

