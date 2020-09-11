import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import userPhoto from "../../assets/img/userPhoto.png";

const Img = styled.img`
  width: 70px;
  border-radius: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  box-sizing: border-box;

  &:last-child {
    margin: 0;
  }
`;
const InfoWrapper = styled.div`
  flex: 0 0 80%;
  display: flex;
  justify-content: space-between;
  border: 2px solid black;
  border-radius: 15px;
  padding: 15px;
  box-sizing: border-box;
`;
const UserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0 0 20%;
  box-sizing: border-box;
`;
const Button = styled.button`
  display: block;
  margin: 0 auto;
  cursor: pointer;
`;
const ButtonWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
`;



const SingleUser = ({ user, follow, unfollow, followingInProgress }) => {
    const subscribe = (id) => () => follow(id)
    const unsubscribe = (id) => () => unfollow(id)
    return (
        <Wrapper key={user.id}>
            <UserWrapper>
                <NavLink to={"/profile/" + user.id}>
                    <Img src={user.photos.small != null ? user.photos.small : userPhoto} alt="avatar" />
                </NavLink>
                <ButtonWrapper>
                    {
                        user.followed ?
                            <Button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={unsubscribe(user.id)}
                            >unFollow</Button> :
                            <Button
                                disabled={followingInProgress.some(id => id === user.id)}
                                onClick={subscribe(user.id)}
                            >follow</Button>
                    }
                </ButtonWrapper>
            </UserWrapper>
            <InfoWrapper>
                <div>
                    <div>{user.name}</div>
                    <div>{user.status != null ? user.status : "No status"}</div>
                </div>
                <div>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </div>
            </InfoWrapper>
        </Wrapper>
    );
}

export default SingleUser;