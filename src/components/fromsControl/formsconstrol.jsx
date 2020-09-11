import React from 'react';
import styled from 'styled-components';

const NormalInput = styled.input`
`
const InputError = styled.input`
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