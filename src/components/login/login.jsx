import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../fromsControl/formsconstrol";
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

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field type="text" name="email" placeholder="email" validate={[required]} component={Input} />
            </div>
            <div>
                <Field type="password" name="password" placeholder="password" validate={[required]} component={Input} />
            </div>
            <div>
                <Field type="checkbox" name="remeberMe" component="input" /> Remember me
            </div>
            {props.error && <Error>{props.error}</Error>}
            <button>Login</button>
        </form>
    )
}
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
const Login = (props) => {

    const onSubmit = (formData) => {
        const { email, password } = formData;
        props.login(email, password);
    }
    if (props.isAuth) {
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
