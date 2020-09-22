import { authMe } from "./authReducer";

const INITIALIZED_SUCCESS: string = "INITIALIZED-SUCCESS";


const initialState: InitialStateType = {
    initialized: false
}
export type InitialStateType = {
    initialized: boolean
}
const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
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
export const initializedSuccess = (): InitializedSuccessType => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch: any) => {
    const promise = dispatch(authMe())
    //dispatch(somethingelse());
    //dispatch(somethingelse());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}

export default appReducer;