// Axios used to make AJAX requests
import axios from 'axios'
import { FETCH_USER, FETCH_USERS } from './types'

export const fetchUser = function(){
	// Redux thunk gives us access to the dispatch function. 
	// After a request is successfully made, we can use the dispatch function to use an action and continue to updating the redux store.
	// Only the response data property required by reducer
	return function(dispatch){
		axios.get('/api/current_user')
			.then(res => dispatch({ 
				type: FETCH_USER,
				payload: res.data
				 }))
			//.then(res => {console.log('In API with res', res)})

/*
Async refactor
export const fetchUser = () => async (dispatch) => {
	const res = await axios.get('/api/current_user')

	dispatch ({ type:FETCH_USER, payload: res})
}

*/
	}
}

// export const handleToken = (token) => async  dispatch =>{

// 	const res = await axios.post('/api/stripe', token);

// 	dispatch({ 
// 		type: FETCH_USER,
// 	    payload:res.data
// 			})

// }


export const updateInfo = (values, history) => async dispatch =>{

	console.log("In action updateinfo", values)
	const res = await axios.post('/api/usersave', values);

	history.push('/dashboard');

	dispatch({
		type: FETCH_USER,
		payload:res.data
	})

}

export const fetchAllUsers = () => async dispatch =>{
	const res = await axios.get('/api/users')

	dispatch({
		type: FETCH_USERS,
		payload: res.data
	})
}