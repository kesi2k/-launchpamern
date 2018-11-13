import { FETCH_USER } from '../actions/types'

export default function(state = null, action){
	//console.log(action)
	switch(action.type){

		case FETCH_USER:
		// If action.payload does not contain anything it returns '' (empty string which in JS evaluated to false)
			return action.payload || false

		default:
			return state
	}
}