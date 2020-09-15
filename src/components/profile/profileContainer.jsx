import React from "react";
import { connect } from "react-redux";
import Profile from "./profile";
import { setProfile, getUserStatus, updateUserStatus } from "../redux/profileReducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import { updatePhoto, setContactsForm } from '../redux/profileReducer'


class ProfileContainer extends React.Component {

	profileRender() {
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

	componentDidMount() {
		this.profileRender();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.match.params.userId !== this.props.match.params.userId) {
			this.profileRender();
		}
	}

	render() {
		return (
			<Profile {...this.props} profile={this.props.profile} isOwner={!this.props.match.params.userId} />
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
	connect(mapStateToProps, { setProfile, getUserStatus, updateUserStatus, updatePhoto, setContactsForm }),
	withRouter
)(ProfileContainer)

