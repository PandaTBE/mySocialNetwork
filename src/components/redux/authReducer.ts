import { securityAPI } from './../../api/securityApi';
import { profileAPI } from './../../api/profileApi';
import { headerAPI } from './../../api/authApi';
import { ResultCodesEnum } from './../../api/api';
import { stopSubmit } from "redux-form";
import { InferActionsTypes, BaseThunkType } from "./store-redux";



const initialState = {
    id: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false as boolean,
    userPhoto: null as string | null,
    captchaUrl: null as string | null
};

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_USER_AUTH':
            return {
                ...state,
                ...action.data
            }
        case 'SET_USER_PHOTO':
            return {
                ...state,
                userPhoto: action.userPhoto
            }
        case 'CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state
    };
}


const actions = {
    setUserAuth: (data: UserType | object) => ({ type: 'SET_USER_AUTH', data } as const),
    setUserPhoto: (userPhoto: string) => ({ type: 'SET_USER_PHOTO', userPhoto } as const),
    captchaUrl: (captchaUrl: string | null) => ({ type: 'CAPTCHA_URL', captchaUrl } as const)
}




export const authMe = (): ThunkType => {
    return async (dispatch) => {
        const data = await headerAPI.auth()
        if (data.resultCode === ResultCodesEnum.Success) {
            let { id, login, email } = data.data;
            dispatch(actions.setUserAuth({ id, login, email, isAuth: true }));
            const response = await profileAPI.getUser(id)
            dispatch(actions.setUserPhoto(response.photos.small));
        }

    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType => {
    return async (dispatch) => {
        const response = await headerAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(authMe())
            dispatch(actions.captchaUrl(null))
        }
        else {

            const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit('login', { _error: message }))
            if (response.data.resultCode === ResultCodesEnum.Captcha) {
                dispatch(getCaptchaUrl());
            }
        }
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(actions.captchaUrl(response.data.url))
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
            dispatch(actions.setUserAuth({ ...obj, isAuth: false }))
        }
    }
};
export default authReducer;

type UserType = {
    id: number
    login: string
    email: string
    isAuth: boolean
}

export type PhotosType = {
    small: string
    large: string
}
type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>