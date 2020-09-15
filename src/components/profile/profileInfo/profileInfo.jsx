import React from "react";
import { useState } from "react";
import styled from 'styled-components/macro';
import Preloader from "../../common/preloader/preloader";
import StatusWithHook from "./statusWithHook";
import ContactsForm from './contactsForm';

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

    const [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />
    }
    const uploadPhoto = (e) => {
        if (e.target.files.length) {
            props.updatePhoto(e.target.files[0])
        }
    }
    const contactsFormSubmit = (formData) => {
        props.setContactsForm(formData);
        setEditMode(false);
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
                    {
                        editMode ? <ContactsForm initialValues={props.profile} onSubmit={contactsFormSubmit} /> : <Contacts profile={props.profile} setEditMode={setEditMode} />
                    }
                </Wrapper>
            </ProfileDecor>
        </div>
    )
};

export const Contact = ({ contactKey, contactValue }) => {
    return (
        <div>
            {contactKey}:{contactValue}
        </div>
    )
}
const Contacts = ({ profile, setEditMode }) => {
    return (
        <div>
            <div>{"My name is: " + profile.fullName}</div>
            <div>{profile.lookingForAJob ? 'I am working' : 'I am lokkiing for a job'}</div>
            <div>{profile.lookingForAJobDescription}</div>
            <div>{`a little about me: ${profile.aboutMe ? profile.aboutMe : ""}`}</div>
            <div><b>Contacts</b> {Object.keys(profile.contacts)
                .map(key => <Contact key={key} contactKey={key} contactValue={profile.contacts[key]} />)}
            </div>
            <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
    )
}


export default ProfileInfo;