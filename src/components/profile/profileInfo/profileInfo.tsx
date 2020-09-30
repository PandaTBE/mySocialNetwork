import React, { FC } from "react";
import { useState } from "react";
import styled from 'styled-components/macro';
import Preloader from "../../common/preloader/preloader";
import StatusWithHook from "./statusWithHook";
import ContactsForm from './contactsForm';
import { ProfileType } from "../../redux/profileReducer";
import { ContactsFormType } from "./contactsForm";

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

type PropsType = {
    profile: ProfileType | null
    updatePhoto: (file: File) => void
    setContactsForm: (formData: ContactsFormType) => Promise<() => void>
    isOwner: boolean
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileInfo: FC<PropsType> = ({ profile, updatePhoto, setContactsForm, isOwner, status, updateUserStatus }) => {

    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }
    const uploadPhoto = ((e: any) => {
        if (e.target.files.length) {
            updatePhoto(e.target.files[0])
        }
    }
    )
    const contactsFormSubmit = (formData: ContactsFormType) => {
        setContactsForm(formData)
            .then(() => {
                setEditMode(false);
            })

    }

    return (
        <div>
            <ProfileDecor>
                <ProfileAvatarWr>
                    {profile.photos.large
                        ? <Avatar src={profile.photos.large} alt='avatar' />
                        : <Img src="https://html5css.ru/w3css/img_avatar3.png" alt="avatar" />}

                    {isOwner ? <input onChange={uploadPhoto} type="file" /> : null}
                    <StatusWithHook status={status} updateUserStatus={updateUserStatus} />
                </ProfileAvatarWr>
                <Wrapper>
                    {
                        editMode ? <ContactsForm
                            initialValues={profile}
                            profile={profile}
                            onSubmit={contactsFormSubmit} /> : <Contacts profile={profile} setEditMode={setEditMode} />
                    }
                </Wrapper>
            </ProfileDecor>
        </div>
    )
};
type ContactPropsType = {
    contactKey: string
    contactValue: string
}
export const Contact: FC<ContactPropsType> = ({ contactKey, contactValue }) => {
    return (
        <div>
            {contactKey}: {contactValue}
        </div>
    )
}
type ContactsPropsType = {
    profile: ProfileType
    setEditMode: (value: boolean) => void
}
const Contacts: FC<ContactsPropsType> = ({ profile, setEditMode }) => {
    return (
        <div>
            <div>{"My name is: " + profile.fullName}</div>
            <div>{profile.lookingForAJob ? 'I am working' : 'I am lokkiing for a job'}</div>
            <div>{profile.lookingForAJobDescription}</div>
            <div>{`a little about me: ${profile.aboutMe ? profile.aboutMe : ""}`}</div>
            <div><b>Contacts</b> {Object.keys(profile.contacts)
                //@ts-ignore
                .map(key => <Contact key={key} contactKey={key} contactValue={profile.contacts[key]} />)}
            </div>
            <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
    )
}


export default ProfileInfo;