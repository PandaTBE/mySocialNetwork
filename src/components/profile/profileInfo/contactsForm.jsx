import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, TextArea } from '../../fromsControl/formsconstrol';

const ContactsForm = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Full name', 'fullName', [], Input, { type: 'text' })}
            Looking fo a job?
            {createField(null, 'lookingForAJob', [], Input, { type: 'checkbox' })}
            {createField('Job Description', 'lookingForAJobDescription', [], TextArea, { type: 'text' })}
            {createField('about me', 'aboutMe', [], TextArea, { type: 'text' })}
            {/* <div><b>Contacts</b> {Object.keys(props.profile.contacts)
                .map(key => <Contact key={key} contactKey={key} contactValue={props.profile.contacts[key]} />)}</div> */}
            <button>Save</button>
        </form>
    )
}


export default reduxForm({ form: 'contactsForm' })(ContactsForm);