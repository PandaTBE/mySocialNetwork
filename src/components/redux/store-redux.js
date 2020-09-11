import sideBarReducer from './sideBarReducer';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import profileReducer from './profileReducer';
import dialogsReducer from './dialogsReducer';
import usersReduser from './usersReduser';
import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import appReducer from './appReducer';


const redusers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sideBar: sideBarReducer,
    usersPage: usersReduser,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));
window.store = store;
export default store;