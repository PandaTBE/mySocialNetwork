import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import s from "./user.module.css";

const Img = styled.img`
width:50px;
border-radius: 100%;
margin-right: 10px;
`

const Wrapper = styled.div`
display: flex;
align-items:center;
margin-bottom: 10px;
&:last-chilf {
    margin: 0;
}
`


type PropsType = {
    name: string
    id: number
}
const User: FC<PropsType> = ({ name, id }) => {
    return (
        <Wrapper>
            <Img src="https://html5css.ru/w3css/img_avatar3.png" alt="user" />
            <NavLink className={s.item} to={"/dialogs/" + id}>
                {name}
            </NavLink>
        </Wrapper>
    )
}

export default User;