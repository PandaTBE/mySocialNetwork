import { usersAPI } from "../../api/api";
import { updateObjectInArray } from "../utils/objectsHelpers";

const FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    SET_USERS = "SET-STATE",
    NEW_CURRENT_PAGE = "NEW-CURRENT-PAGE",
    SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT",
    SET_FETCHING = "SET-FETCHING",
    TOGGLE_FOLLOWING_PROGRESS = "TOGGLE-FOLLOWING-PROGRESS";


const initialState = {
    users: [],
    pageSize: 5,
    currentPage: 1,
    usersCount: 0,
    isFetching: false,
    followingInProgress: []

}

const usersReduser = (state = initialState, action) => {
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

export const followSucces = (userId) => ({ type: FOLLOW, userId });
export const unFollowSucces = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const newCurrentPage = (currentPage) => ({ type: NEW_CURRENT_PAGE, currentPage });
export const setTotalUserCount = (usersCount) => ({ type: SET_TOTAL_USERS_COUNT, usersCount });
export const setFetching = (isFetching) => ({ type: SET_FETCHING, isFetching });
export const toggleFollowingProgress = (inProgress, userId) => ({ type: TOGGLE_FOLLOWING_PROGRESS, inProgress, userId })

export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(setUsers([]));
        dispatch(setFetching(true));
        dispatch(newCurrentPage(currentPage));
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUserCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch, id, api, actionCreator) => {
    dispatch(toggleFollowingProgress(true, id))
    const data = await api(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id));
    }
    dispatch(toggleFollowingProgress(false, id))
}
export const follow = (id) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, id, usersAPI.subscribe, followSucces)
    }
}

export const unfollow = (id) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, id, usersAPI.unsubscribe, unFollowSucces)
    }
}
export default usersReduser;