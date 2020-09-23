
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../../api/api";
import { SingleUserType } from "../../api/types/types";
import { updateObjectInArray } from "../utils/objectsHelpers";
import { AppStateType } from "./store-redux";

const FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    SET_USERS = "SET-STATE",
    NEW_CURRENT_PAGE = "NEW-CURRENT-PAGE",
    SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT",
    SET_FETCHING = "SET-FETCHING",
    TOGGLE_FOLLOWING_PROGRESS = "TOGGLE-FOLLOWING-PROGRESS";


const initialState = {
    users: [] as Array<SingleUserType>,
    pageSize: 5 as number,
    currentPage: 1 as number,
    usersCount: 0 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>
}
type InitialStateType = typeof initialState

const usersReduser = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })

            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case NEW_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                usersCount: action.usersCount
            }
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.inProgress
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;

    }
}



type FollowSuccesType = {
    type: typeof FOLLOW
    userId: number
}
export const followSucces = (userId: number): FollowSuccesType => ({ type: FOLLOW, userId });
type UnFollowSuccesType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unFollowSucces = (userId: number): UnFollowSuccesType => ({ type: UNFOLLOW, userId });
type SetUsersType = {
    type: typeof SET_USERS
    users: Array<SingleUserType>
}
export const setUsers = (users: Array<SingleUserType>): SetUsersType => ({ type: SET_USERS, users });
type NewCurrentPageType = {
    type: typeof NEW_CURRENT_PAGE
    currentPage: number
}
export const newCurrentPage = (currentPage: number): NewCurrentPageType => ({ type: NEW_CURRENT_PAGE, currentPage });
type SetTotalUserCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    usersCount: number
}
export const setTotalUserCount = (usersCount: number): SetTotalUserCountType => ({ type: SET_TOTAL_USERS_COUNT, usersCount });
type SetFetchingType = {
    type: typeof SET_FETCHING
    isFetching: boolean
}
export const setFetching = (isFetching: boolean): SetFetchingType => ({ type: SET_FETCHING, isFetching });
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_FOLLOWING_PROGRESS
    inProgress: boolean
    userId: number
}
export const toggleFollowingProgress = (inProgress: boolean, userId: number)
    : ToggleFollowingProgressType => ({ type: TOGGLE_FOLLOWING_PROGRESS, inProgress, userId })

type ActionsTypes = FollowSuccesType | UnFollowSuccesType | SetUsersType
    | NewCurrentPageType | SetTotalUserCountType | SetFetchingType | ToggleFollowingProgressType

type DispatchType = Dispatch<ActionsTypes>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(setUsers([]));
        dispatch(setFetching(true));
        dispatch(newCurrentPage(currentPage));
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUserCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: DispatchType, id: number, api: any,
    actionCreator: (userId: number) => FollowSuccesType | UnFollowSuccesType) => {
    dispatch(toggleFollowingProgress(true, id))
    const data = await api(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(toggleFollowingProgress(false, id))
}
export const follow = (id: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, id, usersAPI.subscribe, followSucces)
    }
}

export const unfollow = (id: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, id, usersAPI.unsubscribe, unFollowSucces)
    }
}
export default usersReduser;