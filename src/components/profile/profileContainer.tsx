import React from "react";
import { connect } from "react-redux";
import Profile from "./profile";
import { setProfile, getUserStatus, updateUserStatus, ProfileType } from "../redux/profileReducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from '../hoc/withAuthRedirect'
import { updatePhoto, setContactsForm } from '../redux/profileReducer'
import { AppStateType } from "../redux/store-redux";
import { ContactsFormType } from "./profileInfo/contactsForm";

type PropsType = MapStateType & MapDispatchType & RouteComponentProps<any>

class ProfileContainer extends React.Component<PropsType> {

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
	componentDidUpdate(prevProps: PropsType) {
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

type MapStateType = {
	profile: ProfileType | null
	status: string
	autorizedUserId: number | null
}

const mapStateToProps = (state: AppStateType): MapStateType => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	autorizedUserId: state.auth.id
});

type MapDispatchType = {
	setProfile: (userId: number) => void
	getUserStatus: (userId: number) => void
	updateUserStatus: (status: string) => void
	updatePhoto: (file: File) => void
	setContactsForm: (formData: ContactsFormType) => Promise<() => void>
}
type OwnPropsType = {}
export default compose(
	withAuthRedirect,
	connect(mapStateToProps, { setProfile, getUserStatus, updateUserStatus, updatePhoto, setContactsForm }),
	withRouter
)(ProfileContainer)

