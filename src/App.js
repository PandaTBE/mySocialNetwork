import React from "react";
import HeaderContainer from "./components/header/headerContainer";
import Nav from "./components/nav/nav";
import styled from "styled-components";
import { Route, withRouter } from "react-router-dom";
import News from "./components/news/news";
import Music from "./components/music/music";
import Settings from "./components/settings/settings";
import Friends from "./components/friends/friends";
import DialogsContainer from "./components/dialogs/dialogsContainer";
import UsersContainer from "./components/users/usersContainer";
//import ProfileContainer from "./components/profile/profileContainer";
import { connect } from "react-redux";
import { initializeApp } from './components/redux/appReducer';
import { compose } from "redux";
import Preloader from "./components/common/preloader/preloader";
import { withSuspense } from "./components/hoc/withSuspense";
//import Login from "./components/login/login";
const Login = React.lazy(() => import('./components/login/login')); // Ленивая загрузка
const ProfileContainer = React.lazy(() => import('./components/profile/profileContainer'));


const Wrapper = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: grid;

  grid-template-areas:
    "header header"
    "nav cont";
  grid-template-rows: 60px 1fr;
  grid-template-columns: 3fr 9fr;
  grid-gap: 10px;
`;
const WrapperContent = styled.div`
grid-area: cont;
  margin-top: 20px;
  border-radius: 5px;
  border: 2px solid grey;
`

class App extends React.Component {

	componentDidMount() {
		this.props.initializeApp()
	}
	render() {
		if (!this.props.initialized) {
			return <Preloader />
		}

		return (
			<Wrapper>
				<HeaderContainer />
				<Nav state={this.props.state.sideBar} />
				<WrapperContent>
					<Route path="/dialogs" render={() => <DialogsContainer />} />
					<Route path="/profile/:userId?" render={withSuspense(ProfileContainer)} />
					<Route path="/users" render={() => <UsersContainer />} />
					<Route path="/news" component={News} />
					<Route path="/music" component={Music} />
					<Route path="/settings" component={Settings} />
					<Route path="/friends" render={() => <Friends />} />
					<Route path="/login" render={withSuspense(Login)} />
				</WrapperContent>

			</Wrapper>

		);
	}
}
const mapStateToProps = (state) => ({
	initialized: state.app.initialized
})

export default compose(
	withRouter,
	connect(mapStateToProps, { initializeApp })
)(App)


