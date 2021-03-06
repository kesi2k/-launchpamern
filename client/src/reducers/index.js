import { combineReducers } from 'redux';
//called reducer in the react-reducer library. We rename it reduxForm
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducers';
import usersReducer from './usersReducer'
import oneUserReducer from './oneUserReducer'


export default combineReducers ({
	auth: authReducer,
	users: usersReducer,
	user: oneUserReducer,
	form: reduxForm

})