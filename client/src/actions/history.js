import { PUSH_TO_HISTORY } from '../constants'

export function pushToHistory(action){
	return {
		type: PUSH_TO_HISTORY,
		payload: action
	}
}
