import { Action } from "redux";

const initialState = {
    friends: [
        { id: 1, name: "Nikita" },
        { id: 2, name: "Dima" },
        { id: 3, name: "Masha" }
    ] as Array<FriendsType>
}
const sideBarReducer = (state = initialState, action: Action): InitialStatetype => {
    return state
};
export default sideBarReducer;

type InitialStatetype = typeof initialState
type FriendsType = {
    id: number
    name: string
}