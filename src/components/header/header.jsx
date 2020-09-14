import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import userPhoto from '../../assets/img/userPhoto.png';

const Head = styled.header`
  grid-area: header;
  background-color: green;
  padding: 0 15px;
  min-height: 70px;
  display: flex;
  align-items: center;
  display: flex;
  justify-content:space-between;
`;
const Img = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
`;
const NavLinkS = styled(NavLink)`
color:#ffff;
text-decoration: none;
`
const User = styled.div`
color: #ffff;
margin-right: 10px;
text-decoration: none;
`
const Wrapper = styled.div`
display: flex;
align-items: center;
`
const AutorizedUserPhoto = styled.img`
 width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;

`


const Header = (props) => {
  return (
    <Head>
      <Img
        src="https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/e1/90/dc/e190dc15-b89d-8e8a-2027-2fb11741a3d2/AppIcon-1x_U007emarketing-0-6-0-0-sRGB-85-220.png/246x0w.png"
        alt="logo"
      />
      <Wrapper>
        {props.userPhoto ? <AutorizedUserPhoto src={props.userPhoto} alt="userPhoto" /> : <Img src={userPhoto} alt="userPhoto" />}
        {props.isAuth ? <NavLinkS to="/profile"><User>{props.login}</User></NavLinkS>
          : <NavLinkS to="/login">Login</NavLinkS>}
        {props.isAuth ? <button onClick={props.logout}>Logut</button> : null}

      </Wrapper>
    </Head>
  );
};

export default Header;
