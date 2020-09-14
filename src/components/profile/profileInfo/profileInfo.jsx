import React from "react";
import styled from 'styled-components/macro';
import Preloader from "../../common/preloader/preloader";
import StatusWithHook from "./statusWithHook";

const ProfileDecor = styled.div`
display: flex;
padding: 10px;
box-sizing: border-box;

`
const Wrapper = styled.div`
box-sizing: border-box;
text-align: right;
flex: 0 0 65%;
`
const Avatar = styled.img`
box-sizing: border-box;
width:100%;
`
const ProfileAvatarWr = styled.div`
flex: 0 0 25%;
`
const Img = styled.img`
width: 100%;
`

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    const uploadPhoto = (e) => {
        if (e.target.files.length) {
            props.updatePhoto(e.target.files[0])
        }
    }
    return (
        <div>
            <ProfileDecor>
                <ProfileAvatarWr>
                    {props.profile.photos.large
                        ? <Avatar src={props.profile.photos.large} alt='avatar' />
                        : <Img src="https://html5css.ru/w3css/img_avatar3.png" alt="avatar" />}

                    {props.isOwner ? <input onChange={uploadPhoto} type="file" /> : null}
                    <StatusWithHook status={props.status} updateUserStatus={props.updateUserStatus} />
                </ProfileAvatarWr>
                <Wrapper>
                    <div>{"My name is: " + props.profile.fullName}</div>
                    <div>{props.profile.lookingForAJob ? 'I am lokkiing for a job' : 'I am working'}</div>
                    <div>{`a little about me: ${props.profile.aboutMe}`}</div>
                </Wrapper>
            </ProfileDecor>
        </div>
    )
};

export default ProfileInfo;