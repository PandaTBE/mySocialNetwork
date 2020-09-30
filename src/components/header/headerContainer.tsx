import React from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { logout } from '../redux/authReducer';
import { AppStateType } from '../redux/store-redux';


type PropsType = mapDispatchType & MapStateType & OnwPropsType

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return (
            <Header isAuth={this.props.isAuth}
                login={this.props.login}
                userPhoto={this.props.userPhoto}
                logout={this.props.logout} />
        )
    }
}
type MapStateType = {
    isAuth: boolean
    login: string | null
    userPhoto: string | null
}
type mapDispatchType = {
    logout: () => void
}
type OnwPropsType = {}
const mapStateToProps = (state: AppStateType): MapStateType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userPhoto: state.auth.userPhoto
});



export default connect<MapStateType, mapDispatchType, OnwPropsType, AppStateType>(mapStateToProps, { logout })(HeaderContainer);