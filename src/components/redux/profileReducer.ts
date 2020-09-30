import { ResultCodesEnum, SetContactsFormType } from './../../api/api';
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { profileAPI } from "../../api/api";
import { PhotosType } from "./authReducer";
import { AppStateType } from "./store-redux";

const ADD_POST = "ADD-POST",
	SET_USER_PROFILE = "SET-USER-PROFILE",
	SET_USER_STATUS = "SET-USER-STATUS",
	NEW_PHOTO = "NEW-PHOTO";

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
const initialState = {
	posts: [
		{ id: 1, message: "Hey, how are you?", likesCount: 3 },
		{ id: 2, message: "This is my first post", likesCount: 15 },
		{ id: 3, message: "This is my first post", likesCount: 17 },
	] as Array<PostsType>,
	profile: null as ProfileType | null,
	status: ""
};
type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case ADD_POST:
			let post = {
				id: 5,
				message: action.newPost,
				likesCount: 0
			};
			return {
				...state,
				posts: [...state.posts, post],

			};

		case SET_USER_PROFILE:
			return { ...state, profile: action.profile };

		case SET_USER_STATUS:
			return {
				...state,
				status: action.status
			}
		case NEW_PHOTO:
			return {
				...state,
				//@ts-ignore
				profile: { ...state.profile, photos: action.photo }
			}
		default:
			return state;
	}
};
type AddPostActionCreatorType = {
	type: typeof ADD_POST
	newPost: string
}
export const addPost = (newPost: string): AddPostActionCreatorType => ({ type: ADD_POST, newPost })
type SetUserProfileType = {
	type: typeof SET_USER_PROFILE
	profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({ type: SET_USER_PROFILE, profile })
type SetUserStatusType = {
	type: typeof SET_USER_STATUS
	status: string
}
export const setUserStatus = (status: string): SetUserStatusType => ({ type: SET_USER_STATUS, status })
type NewPhotoType = {
	type: typeof NEW_PHOTO
	photo: PhotosType
}
export const newPhoto = (photo: PhotosType): NewPhotoType => ({ type: NEW_PHOTO, photo })

type ActionsType = AddPostActionCreatorType | SetUserProfileType | SetUserStatusType | NewPhotoType
type GetStateType = () => AppStateType
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const setProfile = (userId: number | null): ThunkType => {
	return async (dispatch) => {
		const data = await profileAPI.getUser(userId);
		dispatch(setUserProfile(data))
	}
}
export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
	const response = await profileAPI.getStatus(userId);
	dispatch(setUserStatus(response))
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(setUserStatus(status))
	}
}

export const updatePhoto = (photo: File): ThunkType => async (dispatch) => {
	const data = await profileAPI.uploadPhoto(photo);
	if (data.resultCode === ResultCodesEnum.Success) {
		dispatch(newPhoto(data.data.photos))
	}
}

export const setContactsForm = (formData: SetContactsFormType): ThunkType => async (dispatch, getState: GetStateType) => {
	const userId = getState().auth.id;
	const response = await profileAPI.setContacts(formData);
	if (response.data.resultCode === ResultCodesEnum.Success) {
		dispatch(setProfile(userId));
	} else {
		const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
		// @ts-ignore
		dispatch(stopSubmit('contactsForm', { _error: message }))
		return Promise.reject(message);
	}
}

export default profileReducer;
