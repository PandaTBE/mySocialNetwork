
import { actions, MessagesType, UsersArrayType } from "../redux/dialogsReducer";
import Dialogs from "./dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../redux/store-redux";

type MapStateType = {
    messages: Array<MessagesType>
    users: Array<UsersArrayType>
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        messages: state.dialogsPage.messages,
        users: state.dialogsPage.users
    }
};

const { addMessage } = actions

export default compose(
    connect(mapStateToProps, { addMessage }),
    withAuthRedirect
)(Dialogs)