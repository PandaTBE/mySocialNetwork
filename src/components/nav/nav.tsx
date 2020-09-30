import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import s from './nav.module.css';
import Friend from "../friends/friend/friend";
import { AppStateType } from "../redux/store-redux";
import { useSelector } from "react-redux";

const Navigation = styled.nav`
  grid-area: nav;
  background-color: burlywood;
  margin-top: 20px;
  margin-right: 10px;
  padding: 20px;
  border-radius:5px;
`;
const LinkWrapper = styled.div`
  margin: 10px 0;
  &:last-child {
    margin-top: 50px;
  }
`;
const FriendWrapper = styled.div`
display: flex;
justify-content: center;
margin-top: 10px;

`
const Nav = () => {
  const friends = useSelector((state: AppStateType) => state.sideBar.friends)
  const friendsArr = friends.map(friend => <Friend key={friend.id} name={friend.name} />)
  return (
    <Navigation>
      <LinkWrapper>
        <NavLink to="/profile" className={s.link} activeClassName={s.link__active}>Profile</NavLink>
      </LinkWrapper>
      <LinkWrapper>
        <NavLink to="/dialogs" className={s.link} activeClassName={s.link__active}>Messages</NavLink>
      </LinkWrapper>
      <LinkWrapper>
        <NavLink to="/news" className={s.link} activeClassName={s.link__active}>News</NavLink>
      </LinkWrapper>
      <LinkWrapper>
        <NavLink to="/music" className={s.link} activeClassName={s.link__active}>Music</NavLink>
      </LinkWrapper>
      <LinkWrapper>
        <NavLink to="/settings" className={s.link} activeClassName={s.link__active}>Settings</NavLink>
      </LinkWrapper>
      <LinkWrapper>
        <NavLink to="/users" className={s.link} activeClassName={s.link__active}>Add Users</NavLink>
      </LinkWrapper>
      <LinkWrapper>
        <NavLink to="/friends" className={s.link} activeClassName={s.link__active}>Feiends</NavLink>
        <FriendWrapper>
          {friendsArr}
        </FriendWrapper>
      </LinkWrapper>
    </Navigation>
  );
};
export default Nav;
