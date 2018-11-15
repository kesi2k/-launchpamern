import { FETCH_USER_INFO } from '../actions/types'


export default function (state=[], action){
	switch(action.type){
		case FETCH_USER_INFO:
			return action.payload
		default:
			return state
	}
}