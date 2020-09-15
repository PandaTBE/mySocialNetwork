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

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input, { type: "text" })}
            {createField("Password", "password", [required], Input, { type: "password" })}
            {createField(null, "remeberMe", [], Input, { type: "checkbox" }, "Remember me")}
            {captchaUrl && <img src={captchaUrl} alt="captcha" />}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input, { type: "text" })}
            {error && <Error>{error}</Error>}
            <button>Login</button>
        </form>
    )
}
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
const Login = ({ login, isAuth, captchaUrl }) => {
    const onSubmit = (formData) => {
        const { email, password, remeberMe, captcha } = formData;
        login(email, password, remeberMe, captcha);
    }
    if (isAuth) {
        return <Redirect to="/profile" />
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
export default connect(mapStateToProps, { login })(Login);
