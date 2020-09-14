import React from "react";
import ProfileInfo from "./profileInfo/profileInfo";
import styled from 'styled-components';
import MyPostsContainer from "../myPosts/myPostsContainer";


const PostsDecor = styled.div`
padding: 10px;
`

const Profile = (props) => {
	return (

		<div>
			<ProfileInfo
				isOwner={props.isOwner}
				profile={props.profile}
				status={props.status}
				updateUserStatus={props.updateUserStatus}
				updatePhoto={props.updatePhoto} />
			<PostsDecor>
				<MyPostsContainer />
			</PostsDecor>

		</div>
	);
};
export default Profile;
