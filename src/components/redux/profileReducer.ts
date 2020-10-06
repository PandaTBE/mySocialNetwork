import { SetContactsFormType } from './../../api/profileApi';
import { ResultCodesEnum } from './../../api/api';
import { stopSubmit } from "redux-form";
import { profileAPI } from "../../api/profileApi";
import { PhotosType } from "./authReducer";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./store-redux";

const initialState = {
	posts: [
		{ id: 1, message: "Hey, how are you?", likesCount: 3 },
		{ id: 2, message: "This is my first post", likesCount: 15 },
		{ id: 3, message: "This is my first post", likesCount: 17 },
	] as Array<PostsType>,
	profile: null as ProfileType | null,
	status: ""
};
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'ADD_POST':
			let post = {
				id: 5,
				message: action.newPost,
				likesCount: 0
			};
			return {
				...state,
				posts: [...state.posts, post],

			};

		case 'SET_USER_PROFILE':
			return { ...state, profile: action.profile };

		case 'SET_USER_STATUS':
			return {
				...state,
				status: action.status
			}
		case 'NEW_PHOTO':
			return {
				...state,
				profile: { ...state.profile, photos: action.photo } as ProfileType
			}
		default:
			return state;
	}
};

export const actions = {
	addPost: (newPost: string) => ({ type: 'ADD_POST', newPost } as const),
	setUserProfile: (profile: ProfileType) => ({ type: 'SET_USER_PROFILE', profile } as const),
	setUserStatus: (status: string) => ({ type: 'SET_USER_STATUS', status } as const),
	newPhoto: (photo: PhotosType) => ({ type: 'NEW_PHOTO', photo } as const)

}
export const setProfile = (userId: number | null): ThunkType => {
	return async (dispatch) => {
		const data = await profileAPI.getUser(userId);
		dispatch(actions.setUserProfile(data))
	}
}
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
	const response = await profileAPI.getStatus(userId);
	dispatch(actions.setUserStatus(response))
}
export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.setUserStatus(status))
	}
}
export const updatePhoto = (photo: File): ThunkType => async (dispatch) => {
	const data = await profileAPI.uploadPhoto(photo);
	if (data.resultCode === ResultCodesEnum.Success) {
		dispatch(actions.newPhoto(data.data.photos))
	}
}
export const setContactsForm = (formData: SetContactsFormType): ThunkType => async (dispatch, getState: GetStateType) => {
	const userId = getState().auth.id;
	const response = await profileAPI.setContacts(formData);
	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(setProfile(userId));
	} else {
		const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
		dispatch(stopSubmit('contactsForm', { _error: message }))
		return Promise.reject(message);
	}
}

export default profileReducer;

type ActionsType = InferActionsTypes<typeof actions>
type GetStateType = () => AppStateType
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>
type InitialStateType = typeof initialState
export type ContactsType = {
	github: string
	vk: string
	facebook: string
	instagram: string
	twitter: string
	website: string
	youtube: string
	mainLink: string
}
export type ProfileType = {
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string
	fullName: string
	aboutMe: string
	contacts: ContactsType
	photos: PhotosType
}
export type PostsType = {
	id: number
	message: string
	likesCount: number
}