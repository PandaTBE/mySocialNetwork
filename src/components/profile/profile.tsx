import React, { FC } from "react";
import ProfileInfo from "./profileInfo/profileInfo";
import styled from 'styled-components';
import MyPostsContainer from "../myPosts/myPostsContainer";
import { ProfileType } from "../redux/profileReducer";
import { ContactsFormType } from "./profileInfo/contactsForm";



const PostsDecor = styled.div`
padding: 10px;
`

type PropsType = {
	isOwner: boolean
	profile: ProfileType | null
	status: string
	updateUserStatus: (status: string) => void
	updatePhoto: (file: File) => void
	setContactsForm: (formData: ContactsFormType) => Promise<() => void>
}

const Profile: FC<PropsType> = ({ isOwner, profile, status, updateUserStatus, updatePhoto, setContactsForm }) => {
	return (

		<div>
			<ProfileInfo
				isOwner={isOwner}
				profile={profile}
				status={status}
				updateUserStatus={updateUserStatus}
				updatePhoto={updatePhoto}
				setContactsForm={setContactsForm} />
			<PostsDecor>
				<MyPostsContainer />
			</PostsDecor>

		</div>
	);
};
export default Profile;
