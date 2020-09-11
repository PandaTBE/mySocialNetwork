import React from "react";
import { connect } from "react-redux";
import Profile from "./profile";
import { setProfile, getUserStatus, updateUserStatus } from "../redux/profileReducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from '../hoc/withAuthRedirect'


class ProfileContainer extends React.Component {

	componentDidMount() {
		let userId = this.props.match.params.userId;
		if (!userId) {
			userId = this.props.autorizedUserId;
			if (!userId) {
				this.props.history.push('/login')
			}
		}
		this.props.setProfile(userId);
		this.props.getUserStatus(userId)
	}

	render() {
		return (
			<Profile {...this.props} profile={this.props.profile} />
		)
	}
}

const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	autorizedUserId: state.auth.id
});


export default compose(
	withAuthRedirect,
	connect(mapStateToProps, { setProfile, getUserStatus, updateUserStatus }),
	withRouter
)(ProfileContainer)

