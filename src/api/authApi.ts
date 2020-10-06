import { instanse, ResponseTypes, ResultCodesEnum } from './api';
type AuthDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}
export const headerAPI = {
    auth() {
        return instanse.get<ResponseTypes<ResultCodesEnum, AuthDataType>>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = true, captcha: string | null = null) {
        return instanse.post<ResponseTypes<ResultCodesEnum, LoginResponseDataType>>('auth/login', { email, password, rememberMe, captcha })
    },
    logout() {
        return instanse.delete<ResponseTypes>('auth/login')
    }
};