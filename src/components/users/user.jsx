import React from "react";
import styled from "styled-components/macro";
import userPhoto from "../../assets/img/userPhoto.png";
import ReactPaginate from "react-paginate";
import s from "./users.module.css";
import Preloader from "../common/preloader/preloader";
import { NavLink } from "react-router-dom";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
`;
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
const UsersWrapper = styled.div`
  flex-grow: 1;
  padding: 10px;
`;

const User = (props) => {
	let numberOfPages = Math.ceil(props.usersCount / props.pageSize);
	const subscribe = (id) => () => props.follow(id)
	const unsubscribe = (id) => () => props.unfollow(id)



	return (
		<Block>
			{props.isFetching ? <Preloader /> : null}
			<UsersWrapper>
				{props.users.map((user) => {
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
												disabled={props.followingInProgress.some(id => id === user.id)}
												onClick={unsubscribe(user.id)}
											>unFollow</Button> :
											<Button
												disabled={props.followingInProgress.some(id => id === user.id)}
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
				})}
			</UsersWrapper>
			<ReactPaginate
				pageCount={numberOfPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={3}
				containerClassName={s.wrapper}
				pageClassName={s.page}
				breakClassName={s.break}
				previousClassName={s.previous}
				nextClassName={s.next}
				activeClassName={s.active}
				pageLinkClassName={s.link}
				onPageChange={(e) => props.onPageChange(e)}
				activeLinkClassName={s.activeLink}
				previousLinkClassName={s.btnLink}
				nextLinkClassName={s.btnLink}
			></ReactPaginate>
		</Block >
	);
};

export default User;