import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sideBarReducer from "./sideBarReducer";


let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "Hey, how are you?", likesCount: 3 },
                { id: 2, message: "This is my first post", likesCount: 15 },
                { id: 3, message: "This is my first post", likesCount: 17 }
            ],
            newPostText: ""
        },
        dialogsPage: {
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
            newMessageText: ""
        },
        sideBar: {
            friends: [
                "Nikita",
                "Masha",
                "Dima"
            ]
        }
    },
    _callSubscriber() { },

    subscribe(observer) {
        this._callSubscriber = observer;
    },
    getState() {
        return this._state
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sideBar = sideBarReducer(this._state.sideBar, action);

        this._callSubscriber(this._state);
    }
}

export default store;