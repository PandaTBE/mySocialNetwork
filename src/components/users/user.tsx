import React, { FC } from "react";
import styled from "styled-components/macro";
import Preloader from "../common/preloader/preloader";
import Paginator from "../common/paginator/paginator";
import SingleUser from "./singleUser";
import { SingleUserType } from "../../types/types";

const Block = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
`;
const UsersWrapper = styled.div`
  flex-grow: 1;
  padding: 10px;
`;
type PropsType = {
	isFetching: boolean
	users: Array<SingleUserType>
	follow: (userId: number) => void
	unfollow: (userId: number) => void
	followingInProgress: Array<number>
	usersCount: number
	pageSize: number
	onPageChange: (pageNumber: number) => void
}
const User: FC<PropsType> = ({ isFetching, users, follow, unfollow, followingInProgress, usersCount, pageSize, onPageChange }) => {
	return (
		<Block>
			{isFetching ? <Preloader /> : null}
			<UsersWrapper>
				{
					users.map((user) => <SingleUser
						key={user.id}
						user={user}
						follow={follow}
						unfollow={unfollow}
						followingInProgress={followingInProgress} />
					)
				}
			</UsersWrapper>
			<Paginator usersCount={usersCount} pageSize={pageSize} onPageChange={onPageChange} />
		</Block >
	);
};

export default User;