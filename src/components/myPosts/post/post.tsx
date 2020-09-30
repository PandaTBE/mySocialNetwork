import React, { FC } from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const Text = styled.div`
margin-right: 10px;
`

const Like = styled.div`
  color: greenyellow;
`

type PropsType = {
  message: string
  likeCount: number
}
const Post: FC<PropsType> = ({ message, likeCount }) => {
  return (
    <Wrapper>
      <Img src="https://html5css.ru/w3css/img_avatar3.png" alt="avatar" />
      <Text>{message}</Text>
      <Like>likes: {likeCount}</Like>
    </Wrapper>
  );
};

export default Post;
