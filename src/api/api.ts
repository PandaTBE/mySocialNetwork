import { PhotosType } from './../components/redux/authReducer';
import { ContactsType, ProfileType } from './../components/redux/profileReducer';
import axios from 'axios';
import { SingleUserType } from '../types/types';

const instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "29aabadf-3d40-4ae6-8165-a5dfa9a9fe22"
    }
})

type GetUsersResponseType = {
    items: Array<SingleUserType>
    totalCount: number
    error: string | null
}
export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}
type ResponseTypes = {
    resultCode: number
    messages: Array<string>
    data: object
}
export const usersAPI = {

    getUsers(currentPage = 1, pageSize = 5) {
        return instanse.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    subscribe(id: number) {
        return instanse.post<ResponseTypes>(`follow/${id}`)
            .then(response => response.data)
    },
    unsubscribe(id: number) {
        return instanse.delete<ResponseTypes>(`follow/${id}`)
            .then(response => response.data)
    }
};
type GetUserResponseType = ProfileType

type UploadPhotoResponseType = {
    data: { photos: PhotosType }
    resultCode: number
    messages: Array<string>
}
export type SetContactsFormType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
}
export const profileAPI = {
    getUser(userId: number | null) {
        return instanse.get<GetUserResponseType>('profile/' + userId)
            .then(response => response.data)
    },
    getStatus(userId: number) {
        return instanse.get('profile/status/' + userId)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instanse.put<ResponseTypes>('profile/status', {
            status
        })
    },
    uploadPhoto(photo: File) {
        const formData = new FormData();
        formData.append('photos', photo);
        return instanse.put<UploadPhotoResponseType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    setContacts(formData: SetContactsFormType) {
        return instanse.put<ResponseTypes>('profile', formData)
    }
};
export enum ResultCodesWithCapthcaEnum {
    Captcha = 10
}
type AuthType = {
    data: { id: number, email: string, login: string }
    resultCode: number
    messages: Array<string>
}
type LoginResponseType = {
    resultCode: number
    messages: Array<string>
    data: {
        userId: number
    }
}
export const headerAPI = {
    auth() {
        return instanse.get<AuthType>('auth/me')
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = true, captcha: string | null = null) {
        return instanse.post<LoginResponseType>('auth/login', { email, password, rememberMe, captcha })
    },
    logout() {
        return instanse.delete<ResponseTypes>('auth/login')
    }
};
type GetCaptchaUrlResponseType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instanse.get<GetCaptchaUrlResponseType>('security/get-captcha-url')
    }
}