import { ThunkAction } from "redux-thunk";
import { authMe } from "./authReducer";
import { AppStateType } from "./store-redux";


const INITIALIZED_SUCCESS: string = "INITIALIZED-SUCCESS";


const initialState: InitialStateType = {
    initialized: false
}
export type InitialStateType = {
    initialized: boolean
}
const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state

    }
}

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}
type ActionTypes = InitializedSuccessType
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const initializedSuccess = (): InitializedSuccessType => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = (): ThunkType => (dispatch) => {
    const promise = dispatch(authMe())
    //dispatch(somethingelse());
    //dispatch(somethingelse());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}

export default appReducer;