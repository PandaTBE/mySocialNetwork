const initialState = {
    friends: [
        { id: 1, name: "Nikita" },
        { id: 2, name: "Dima" },
        { id: 3, name: "Masha" }
    ]
}

const sideBarReducer = (state = initialState, action) => {
    return state
};

export default sideBarReducer;