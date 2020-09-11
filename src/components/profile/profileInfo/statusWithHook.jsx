import React from 'react';
import styled from 'styled-components/macro';
import { useState } from 'react';
import { useEffect } from 'react';

const MainStatus = styled.div`
cursor: pointer;
`

const StatusWithHook = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])
    const activateAditMode = () => {
        setEditMode(true)
    }
    const disableAditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.target.value)
    }

    return (
        <>
            {editMode
                ? <input onChange={onStatusChange} onBlur={disableAditMode} autoFocus={true} value={status} type="text" />
                : <MainStatus onDoubleClick={activateAditMode}>{props.status ? props.status : '-----'}</MainStatus>
            }
        </>
    )

}

export default StatusWithHook;