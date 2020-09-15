import React from 'react';
import styled from 'styled-components';
import { Field } from 'redux-form';

const NormalInput = styled.input`
`
const InputError = styled.input`
border: 2px solid #ff0000;
`

const NormalTextArea = styled.textarea`
`
const TextAreaError = styled.textarea`
border: 2px solid #ff0000;
`


export const Input = ({ input, meta, ...props }) => {
    const hasError = meta.error && meta.touched
    return (
        <div>
            {hasError ? <InputError {...input} {...props} /> : <NormalInput {...input} {...props} />}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const TextArea = ({ input, meta, ...props }) => {
    const hasError = meta.error && meta.touched
    return (
        <div>
            {hasError ? <TextAreaError {...input} {...props} /> : <NormalTextArea {...input} {...props} />}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const createField = (placeholder, name, validators, component, propsSettings, text = "") => {
    return (
        <div>
            <Field {...propsSettings} name={name} placeholder={placeholder} validate={validators} component={component} /> {text}
        </div>
    )
}