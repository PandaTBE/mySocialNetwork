const ADD_MESSAGE = "ADD-MESSAGE";

export type UsersArrayType = {
    id: number
    name: string
}
export type MessagesType = {
    id: number
    message: string
}
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
type InitialStateType = typeof initialState
const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let message = { id: 4, message: action.dialogsNewMessage };
            return {
                ...state,
                messages: [...state.messages, message]
            }

        default:
            return state;
    }

}
type AddMessageType = {
    type: typeof ADD_MESSAGE
    dialogsNewMessage: string
}

type ActionsType = AddMessageType

export const addMessage = (dialogsNewMessage: string): AddMessageType => ({ type: ADD_MESSAGE, dialogsNewMessage });


export default dialogsReducer;