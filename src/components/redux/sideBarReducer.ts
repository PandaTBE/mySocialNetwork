
type FriendsType = {
    id: number
    name: string
}
const initialState = {
    friends: [
        { id: 1, name: "Nikita" },
        { id: 2, name: "Dima" },
        { id: 3, name: "Masha" }
    ] as Array<FriendsType>
}
type InitialStatetype = typeof initialState


const sideBarReducer = (state = initialState, action: any): InitialStatetype => {
    return state
};

export default sideBarReducer;