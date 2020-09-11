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
flex: 0 0 80%;
`
const Avatar = styled.img`
box-sizing: border-box;
width:100%;
`

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <ProfileDecor>
                <div>
                    <Avatar src={props.profile.photos.large} alt='avatar' />
                    <StatusWithHook status={props.status} updateUserStatus={props.updateUserStatus} />
                </div>
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