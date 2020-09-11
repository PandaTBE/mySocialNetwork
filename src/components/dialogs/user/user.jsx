import React from "react";
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

const User = (props) => {
    return (
        <Wrapper>
            <Img src="https://html5css.ru/w3css/img_avatar3.png" alt="user" />
            <NavLink className={s.item} to={"/dialogs/" + props.id}>
                {props.name}
            </NavLink>
        </Wrapper>
    )
}

export default User;