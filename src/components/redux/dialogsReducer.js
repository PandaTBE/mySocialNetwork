const ADD_MESSAGE = "ADD-MESSAGE";

const initialState = {
    users: [
        { id: 1, name: "Nikita" },
        { id: 2, name: "Masha" },
        { id: 3, name: "Dima" }
    ],
    messages: [
        { id: 1, message: "hi" },
        { id: 2, message: "How r u" },
        { id: 3, message: "YoYo" }
    ],
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let message = { id: 4, message: action.dialogsNewMessage };
            return {
                ...state,
                messages: [...state.messages, message],
            }

        default:
            return state;
    }

}

export const addMessageActionCreatoe = (dialogsNewMessage) => ({ type: ADD_MESSAGE, dialogsNewMessage });


export default dialogsReducer;