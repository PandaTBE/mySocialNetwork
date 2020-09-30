import React, { FC } from 'react';
import styled from 'styled-components/macro';
import { useState } from 'react';
import { useEffect } from 'react';

const MainStatus = styled.div`
cursor: pointer;
`

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

const StatusWithHook: FC<PropsType> = ({ status, updateUserStatus }) => {
    const [editMode, setEditMode] = useState(false);
    const [localStateStatus, setStatus] = useState(status);

    useEffect(() => {
        setStatus(status)
    }, [status])
    const activateAditMode = () => {
        setEditMode(true)
    }
    const disableAditMode = () => {
        setEditMode(false)
        updateUserStatus(localStateStatus)
    }
    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    return (
        <>
            {editMode
                ? <input onChange={onStatusChange} onBlur={disableAditMode} autoFocus={true} value={localStateStatus} type="text" />
                : <MainStatus onDoubleClick={activateAditMode}>{status ? status : '-----'}</MainStatus>
            }
        </>
    )

}

export default StatusWithHook;