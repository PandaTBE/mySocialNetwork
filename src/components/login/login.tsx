import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Input, createField } from "../fromsControl/formsconstrol";
import { required } from "../validators/validators";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/authReducer'
import { Redirect } from "react-router-dom";
import styled from 'styled-components/macro';
import { AppStateType } from "../redux/store-redux";

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
type OwmLoginFormType = {
    captchaUrl: string | null
}
const LoginForm: FC<InjectedFormProps<LoginFormdataType, OwmLoginFormType> & OwmLoginFormType> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField("Email", "email", [required], Input, { type: "text" })}
            {createField("Password", "password", [required], Input, { type: "password" })}
            {createField(undefined, "remeberMe", [], Input, { type: "checkbox" }, "Remember me")}
            {captchaUrl && <img src={captchaUrl} alt="captcha" />}
            {captchaUrl && createField("Symbols from image", "captcha", [required], Input, { type: "text" })}
            {error && <Error>{error}</Error>}
            <button>Login</button>
        </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormdataType, OwmLoginFormType>({ form: 'login' })(LoginForm)
type LoginFormdataType = {
    email: string
    password: string
    remeberMe: boolean
    captcha: string | null
}
const Login = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const onSubmit = (formData: LoginFormdataType) => {
        const { email, password, remeberMe, captcha } = formData;
        dispatch(login(email, password, remeberMe, captcha));
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
export default Login;
