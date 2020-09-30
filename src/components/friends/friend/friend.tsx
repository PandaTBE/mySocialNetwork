import React, { FC } from "react";
import styled from 'styled-components';

const Img = styled.img`

width: 100%;
    border-radius: 50%;
    display:block;
    margin:0 auto;
`
const Name = styled.div`
text-align: center;
color: #fff;
font-size: 20px;
`
const Item = styled.div`
margin-right: 10px;
&:last-child {
    margin: 0;
}

`

type PropsType = {
    name: string
}

const Friend: FC<PropsType> = ({ name }) => {
    return (
        <Item>
            <Img src="https://html5css.ru/w3css/img_avatar3.png" alt="friend" />
            <Name>{name}</Name>
        </Item>
    )
};

export default Friend;