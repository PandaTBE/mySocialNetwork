import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, getUsers } from "../redux/usersReduser";
import User from "./user";
import { takeUsers, getPageSize, getCurrentPage, getUsersCount, getIsFetching, getFollowingInProgress } from "../redux/usersSelectors";
import { SingleUserType } from "../../types/types";
import { AppStateType } from "../redux/store-redux";
type MapStatePropsType = {
  currentPage: number
  pageSize: number
  users: Array<SingleUserType>
  usersCount: number
  isFetching: boolean
  followingInProgress: Array<number>
}
type MapDispatchPropsType = {
  getUsers: (currentPage: number, pageSize: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}
type OwnPropsType = {}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType
class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }
  onPageChange = (page: any) => {
    this.props.getUsers(page.selected + 1, this.props.pageSize)
  };
  render() {
    return (
      <User
        onPageChange={this.onPageChange}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        users={this.props.users}
        usersCount={this.props.usersCount}
        pageSize={this.props.pageSize}
        isFetching={this.props.isFetching}
        followingInProgress={this.props.followingInProgress}
      />
    );
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: takeUsers(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    usersCount: getUsersCount(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),

  };
};
export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
  { follow, unfollow, getUsers })(UsersContainer);
