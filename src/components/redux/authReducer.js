import { headerAPI, profileAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_AUTH = "SET-USER-AUTH",
    SET_USER_PHOTO = "SET-USER-PHOTO";


const initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    userPhoto: null
};

const authReducer = (state = initialState, action) => {
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
        default:
            return state
    };
}
export const setUserAuth = (data) => ({ type: SET_USER_AUTH, data });
export const setUserPhoto = (photo) => ({ type: SET_USER_PHOTO, photo });

export const authMe = () => {
    return async (dispatch) => {
        const data = await headerAPI.auth()
        if (data.resultCode === 0) {
            let { id, login, email } = data.data;
            dispatch(setUserAuth({ id, login, email, isAuth: true }));
            const response = await profileAPI.getUser(id)
            dispatch(setUserPhoto(response.photos.small));
        }

    }
};

export const login = (email, password, rememberMe = true) => {
    return async (dispatch) => {
        const response = await headerAPI.login(email, password, rememberMe)
        if (response.data.resultCode === 0) {
            dispatch(authMe())
        }
        else {
            const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(stopSubmit('login', { _error: message }))
        }
    }
};
export const logout = () => {
    return async (dispatch) => {
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
