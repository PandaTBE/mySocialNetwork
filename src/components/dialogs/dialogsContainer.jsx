
import { addMessageActionCreatoe } from "../redux/dialogsReducer";
import Dialogs from "./dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";

const mapStateToProps = (state) => {
    return {
        messages: state.dialogsPage.messages,
        users: state.dialogsPage.users,
        newMessageText: state.dialogsPage.newMessageText,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addMessage: (dialogsNewMessage) => dispatch(addMessageActionCreatoe(dialogsNewMessage))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)