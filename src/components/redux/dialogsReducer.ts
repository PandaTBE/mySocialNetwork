import { InferActionsTypes } from "./store-redux";
const initialState = {
    users: [
        { id: 1, name: "Nikita" },
        { id: 2, name: "Masha" },
        { id: 3, name: "Dima" }
    ] as Array<UsersArrayType>,
    messages: [
        { id: 1, message: "hi" },
        { id: 2, message: "How r u" },
        { id: 3, message: "YoYo" }
    ] as Array<MessagesType>,
}
const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            let message = { id: 4, message: action.dialogsNewMessage };
            return {
                ...state,
                messages: [...state.messages, message]
            }

        default:
            return state;
    }

}
export const actions = {
    addMessage: (dialogsNewMessage: string) => ({ type: "ADD-MESSAGE", dialogsNewMessage } as const)
}
export default dialogsReducer;

type ActionsType = InferActionsTypes<typeof actions>
export type UsersArrayType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
type InitialStateType = typeof initialState