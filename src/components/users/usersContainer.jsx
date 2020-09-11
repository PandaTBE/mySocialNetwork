import React from "react";
import { connect } from "react-redux";
import { follow, unfollow, toggleFollowingProgress, getUsers } from "../redux/usersReduser";
import User from "./user";
import { takeUsers, getPageSize, getCurrentPage, getUsersCount, getIsFetching, getFollowingInProgress } from "../redux/usersSelectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }
  onPageChange = (page) => {
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
        toggleFollowingProgress={this.props.toggleFollowingProgress}
        followingInProgress={this.props.followingInProgress}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: takeUsers(state),
    pageSize: getPageSize(state),
    currentPage: getCurrentPage(state),
    usersCount: getUsersCount(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),

  };
};
export default connect(mapStateToProps,
  { follow, unfollow, toggleFollowingProgress, getUsers })(UsersContainer);
