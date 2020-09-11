import { profileAPI } from "../../api/api";

const ADD_POST = "ADD-POST",
	SET_USER_PROFILE = "SET-USER-PROFILE",
	SET_USER_STATUS = "SET-USER-STATUS";


const initialState = {
	posts: [
		{ id: 1, message: "Hey, how are you?", likesCount: 3 },
		{ id: 2, message: "This is my first post", likesCount: 15 },
		{ id: 3, message: "This is my first post", likesCount: 17 },
	],
	profile: null,
	status: ""
};

const profileReducer = (state = initialState, action) => {
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
		default:
			return state;
	}
};
export const addPostActionCreator = (newPost) => ({ type: ADD_POST, newPost })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status })

export const setProfile = (userId) => {
	return async (dispatch) => {
		const data = await profileAPI.getUser(userId);
		dispatch(setUserProfile(data))
	}
}
export const getUserStatus = (userId) => async (dispatch) => {
	const response = await profileAPI.getStatus(userId);
	dispatch(setUserStatus(response))
}

export const updateUserStatus = (status) => async (dispatch) => {
	const response = await profileAPI.updateStatus(status);
	if (response.data.resultCode === 0) {
		dispatch(setUserStatus(status))
	}
}


export default profileReducer;
