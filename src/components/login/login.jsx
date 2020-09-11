import React from "react";
import { reduxForm } from "redux-form";
import { Input, createField } from "../fromsControl/formsconstrol";
import { required } from "../validators/validators";
import { connect } from "react-redux";
import { login } from '../redux/authReducer'
import { Redirect } from "react-router-dom";
import styled from 'styled-components/macro';

const Error = styled.div`
margin-top: 10px;
border: 1px solid red;
border-radius: 5px;
font-size: 15px;
color: red;
padding: 10px;
width: 25%;
text-align: center;
`

const LoginForm = ({ handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input, { type: "text" })}
            {createField("Password", "password", [required], Input, { type: "password" })}
            {createField(null, "remeberMe", [], Input, { type: "checkbox" }, "Remember me")}
            {error && <Error>{error}</Error>}
            <button>Login</button>
        </form>
    )
}
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
const Login = ({ login, isAuth }) => {
    const onSubmit = (formData) => {
        const { email, password } = formData;
        login(email, password);
    }
    if (isAuth) {
        return <Redirect to="/profile" />
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
export default connect(mapStateToProps, { login })(Login);
