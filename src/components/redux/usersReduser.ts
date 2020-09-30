import { ResultCodesEnum } from './../../api/api';

import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../../api/api";
import { SingleUserType } from "../../types/types";
import { updateObjectInArray } from "../utils/objectsHelpers";
import { AppStateType, InferActionsTypes } from "./store-redux";



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
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })

            }

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'NEW_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                usersCount: action.usersCount
            }
        case 'SET_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }
        case 'TOGGLE_FOLLOWING_PROGRESS':
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


const actions = {
    followSucces: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unFollowSucces: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<SingleUserType>) => ({ type: 'SET_USERS', users } as const),
    newCurrentPage: (currentPage: number) => ({ type: 'NEW_CURRENT_PAGE', currentPage } as const),
    setTotalUserCount: (usersCount: number) => ({ type: 'SET_TOTAL_USERS_COUNT', usersCount } as const),
    setFetching: (isFetching: boolean) => ({ type: 'SET_FETCHING', isFetching } as const),
    toggleFollowingProgress: (inProgress: boolean, userId: number) => ({ type: 'TOGGLE_FOLLOWING_PROGRESS', inProgress, userId } as const)
}


type ActionsTypes = InferActionsTypes<typeof actions>
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.setUsers([]));
        dispatch(actions.setFetching(true));
        dispatch(actions.newCurrentPage(currentPage));
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.setFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUserCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: DispatchType, id: number, api: any,
    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, id))
    const data = await api(id)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(id));
    }
    dispatch(actions.toggleFollowingProgress(false, id))
}
export const follow = (id: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, id, usersAPI.subscribe, actions.followSucces)
    }
}

export const unfollow = (id: number): ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, id, usersAPI.unsubscribe, actions.unFollowSucces)
    }
}
export default usersReduser;