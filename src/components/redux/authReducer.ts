import { ResultCodesEnum, ResultCodesWithCapthcaEnum } from './../../api/api';
import { headerAPI, profileAPI, securityAPI } from "../../api/api";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./store-redux";

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
    userPhoto: null as PhotosType | null | string,
    captchaUrl: null as string | null
};
type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                ...action.data
            }
        case SET_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.userPhoto
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
type SetUserAuthType = {
    type: typeof SET_USER_AUTH
    data: UserType | object
}
export const setUserAuth = (data: UserType | object): SetUserAuthType => ({ type: SET_USER_AUTH, data });
type SetUserPhotoType = {
    type: typeof SET_USER_PHOTO
    userPhoto: string
}
export const setUserPhoto = (userPhoto: string): SetUserPhotoType => ({ type: SET_USER_PHOTO, userPhoto });
type CaptchaUrlType = {
    type: typeof CAPTCHA_URL
    captchaUrl: string | null
}

type ActionsType = SetUserAuthType | SetUserPhotoType | CaptchaUrlType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const captchaUrl = (captchaUrl: string | null): CaptchaUrlType => ({ type: CAPTCHA_URL, captchaUrl })

export const authMe = (): ThunkType => {
    return async (dispatch) => {
        const data = await headerAPI.auth()
        if (data.resultCode === ResultCodesEnum.Success) {
            let { id, login, email } = data.data;
            dispatch(setUserAuth({ id, login, email, isAuth: true }));
            const response = await profileAPI.getUser(id)
            dispatch(setUserPhoto(response.photos.small));
        }

    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
    return async (dispatch) => {
        const response = await headerAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(authMe())
            dispatch(captchaUrl(null))
        }
        else {

            const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            // @ts-ignore
            dispatch(stopSubmit('login', { _error: message }))
            if (response.data.resultCode === ResultCodesWithCapthcaEnum.Captcha) {
                dispatch(getCaptchaUrl());
            }
        }
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(captchaUrl(response.data.url))
}
export const logout = (): ThunkType => {
    return async (dispatch) => {
        const response = await headerAPI.logout()
        if (response.data.resultCode === ResultCodesEnum.Success) {
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
