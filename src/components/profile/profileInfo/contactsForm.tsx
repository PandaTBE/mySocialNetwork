import React, { FC } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { createField, Input, TextArea } from '../../fromsControl/formsconstrol';
import { Contact } from './profileInfo';
import styled from 'styled-components';
import { ProfileType } from '../../redux/profileReducer';

const Error = styled.div`
border: 1px solid red;
border-radius: 5px;
font-size: 15px;
color: red;
padding: 10px;
width: 75%;
text-align: center;
margin-left: 21%;
`
type PropsType = {
    profile: ProfileType
}

export type ContactsFormType = {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
}
type ContactsFormTypeKey = Extract<keyof ContactsFormType, string>
const ContactsForm: FC<InjectedFormProps<ContactsFormType, PropsType> & PropsType> = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField<ContactsFormTypeKey>('Full name', 'fullName', [], Input, { type: 'text' })}
            Looking fo a job?
            {createField<ContactsFormTypeKey>(undefined, 'lookingForAJob', [], Input, { type: 'checkbox' })}
            {createField<ContactsFormTypeKey>('Job Description', 'lookingForAJobDescription', [], TextArea, { type: 'text' })}
            {createField<ContactsFormTypeKey>('about me', 'aboutMe', [], TextArea, { type: 'text' })}
            <div>
                {error && <Error>{error}</Error>}
            </div>
            <div><b>Contacts</b> {Object.keys(profile.contacts)
                .map((key) => {
                    return (
                        <div key={key}>
                            {/* @ts-ignore*/}
                            <Contact contactKey={key} contactValue={profile.contacts[key]} />
                            {createField(key, 'contacts.' + key, [], Input, { type: 'text' })}
                        </div>
                    )
                })}</div>
            <button>Save</button>
        </form>
    )
}


export default reduxForm<ContactsFormType, PropsType>({ form: 'contactsForm' })(ContactsForm);
