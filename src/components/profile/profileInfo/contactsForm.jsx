import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, TextArea } from '../../fromsControl/formsconstrol';
import { Contact } from './profileInfo';
import styled from 'styled-components';

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

const ContactsForm = ({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField('Full name', 'fullName', [], Input, { type: 'text' })}
            Looking fo a job?
            {createField(null, 'lookingForAJob', [], Input, { type: 'checkbox' })}
            {createField('Job Description', 'lookingForAJobDescription', [], TextArea, { type: 'text' })}
            {createField('about me', 'aboutMe', [], TextArea, { type: 'text' })}
            <div>
                {error && <Error>{error}</Error>}
            </div>
            <div><b>Contacts</b> {Object.keys(profile.contacts)
                .map(key => {
                    return (
                        <div key={key}>
                            <Contact contactKey={key} contactValue={profile.contacts[key]} />
                            {createField(key, 'contacts.' + key, [], Input, { type: 'text' })}
                        </div>
                    )
                })}</div>
            <button>Save</button>
        </form>
    )
}


export default reduxForm({ form: 'contactsForm' })(ContactsForm);