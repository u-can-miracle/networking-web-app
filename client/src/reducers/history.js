import * as constants from '../constants'
const initialState = {
	history: []
}

export default function historyReducer(state = initialState, action){
	if(action.type in constants){
		return { history: [ ...state.history, action ] }
	} else {
		return state
	}
}
