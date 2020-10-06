import { ThunkAction } from "redux-thunk";
import { authMe } from "./authReducer";
import { AppStateType, InferActionsTypes } from "./store-redux";

const initialState = {
    initialized: false as boolean
}
export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'INITIALIZED-SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state

    }
}

const actions = {
    initializedSuccess: () => ({ type: "INITIALIZED-SUCCESS" } as const)
}

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>

export const initializeApp = (): ThunkType => (dispatch) => {
    const promise = dispatch(authMe())
    //dispatch(somethingelse());
    //dispatch(somethingelse());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}

export default appReducer;