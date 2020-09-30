import React, { FC } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../redux/store-redux";
type mapStateToPropsForRedirectType = {
    isAuth: boolean
}
const mapStateToPropsForRedirect = (state: AppStateType): mapStateToPropsForRedirectType => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component: FC) => {
    class RedirectComponent extends React.Component<mapStateToPropsForRedirectType> {
        render() {

            if (!this.props.isAuth) return <Redirect to="/login" />
            return <Component {...this.props} />

        }
    }
    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}