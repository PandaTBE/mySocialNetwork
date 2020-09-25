import React, { FC } from 'react';
import styled from 'styled-components';
import { Field, WrappedFieldProps } from 'redux-form';
import { FieldValidatorsType } from '../validators/validators';

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


export const Input: FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
    const hasError = meta.error && meta.touched
    return (
        <div>
            {hasError ? <InputError {...input} {...props} /> : <NormalInput {...input} {...props} />}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const TextArea: FC<WrappedFieldProps> = ({ input, meta, ...props }) => {
    const hasError = meta.error && meta.touched
    return (
        <div>
            {hasError ? <TextAreaError {...input} {...props} /> : <NormalTextArea {...input} {...props} />}
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const createField = (placeholder: string | undefined,
    name: string,
    validators: Array<FieldValidatorsType>,
    component: FC<WrappedFieldProps>,
    propsSettings = {}, text = "") => {
    return (
        <div>
            <Field {...propsSettings} name={name} placeholder={placeholder} validate={validators} component={component} /> {text}
        </div>
    )
}