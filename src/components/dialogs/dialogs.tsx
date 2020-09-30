import React, { FC } from "react";
import styled from 'styled-components';
import Dialog from './dialog/dialog'
import User from './user/user'
import { InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../validators/validators";
import { createField, Input } from "../fromsControl/formsconstrol";
import { MessagesType } from '../redux/dialogsReducer'
import { SingleUserType } from "../../types/types";

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
height:100%;
`
const LeftColumn = styled.div`
flex: 0 0 20%;
box-sizing:border-box;
padding: 10px;
border-right: 2px solid grey;
`
const RightColumn = styled.div`
flex: 0 0 80%;
padding: 30px;
box-sizing:border-box;
display:flex;
flex-direction:column;

`
const Messages = styled.div`
flex-grow:1;
overflow: auto;

`

type PropsType = {
    messages: Array<MessagesType>
    users: Array<SingleUserType>
    addMessage: (newMessage: string) => void
}

const Dialogs: FC<PropsType> = ({ messages, users, addMessage }) => {

    const messageComp = messages.map(message => <Dialog key={message.id} text={message.message} />)
    const userComp = users.map(user => <User key={user.id} name={user.name} id={user.id} />)

    const onButtonClick = (value: AddMessageFormType) => {
        addMessage(value.dialogsNewMessage);
    };
    return (
        <Wrapper>
            <LeftColumn>
                {userComp}
            </LeftColumn>
            <RightColumn>
                <Messages>
                    {messageComp}
                </Messages>
                <AddMessageReduxForm onSubmit={onButtonClick} />
            </RightColumn>
        </Wrapper>
    )

};

type AddMessageFormType = {
    dialogsNewMessage: string
}
type AddMessageFormTypeKeys = Extract<keyof AddMessageFormType, string>
const AddMessageForm: FC<InjectedFormProps<AddMessageFormType>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<AddMessageFormTypeKeys>("Write your message", "dialogsNewMessage", [required], Input, { type: "text" })}
            <button>Send</button>
        </form>
    )
}
const AddMessageReduxForm = reduxForm<AddMessageFormType>({ form: 'dialogsNewMessage' })(AddMessageForm)
export default Dialogs;