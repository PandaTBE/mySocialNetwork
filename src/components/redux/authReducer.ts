import { headerAPI, profileAPI, securityAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_AUTH = "SET-USER-AUTH",
    SET_USER_PHOTO = "SET-USER-PHOTO",
    CAPTCHA_URL = "CAPTCHA-URL";

export type PhotosType = {
    small: string
    large: string
}
const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean,
    userPhoto: null as PhotosType | null,
    captchaUrl: null as string | null
};
type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                ...action.data
            }
        case SET_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.photo
            }
        case CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state
    };
}

type UserType = {
    id: number
    login: string
    email: string
    isAuth: boolean
}
export const setUserAuth = (data: UserType | object): any => ({ type: SET_USER_AUTH, data });
type SetUserPhotoType = {
    type: typeof SET_USER_PHOTO
    photo: string
}
export const setUserPhoto = (photo: string): SetUserPhotoType => ({ type: SET_USER_PHOTO, photo });
type CaptchaUrlType = {
    type: typeof CAPTCHA_URL
    captchaUrl: string | null
}
export const captchaUrl = (captchaUrl: string | null): CaptchaUrlType => ({ type: CAPTCHA_URL, captchaUrl })

export const authMe = () => {
    return async (dispatch: any) => {
        const data = await headerAPI.auth()
        if (data.resultCode === 0) {
            let { id, login, email } = data.data;
            dispatch(setUserAuth({ id, login, email, isAuth: true }));
            const response = await profileAPI.getUser(id)
            dispatch(setUserPhoto(response.photos.small));
        }

    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        const response = await headerAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(authMe())
            dispatch(captchaUrl(null))
        }
        else {

            const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit('login', { _error: message }))
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
        }
    }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(captchaUrl(response.data.url))
}
export const logout = () => {
    return async (dispatch: any) => {
        const response = await headerAPI.logout()
        if (response.data.resultCode === 0) {
            const obj = {
                id: null,
                login: null,
                email: null
            }
            dispatch(setUserAuth({ ...obj, isAuth: false }))
        }
    }
};
export default authReducer;
