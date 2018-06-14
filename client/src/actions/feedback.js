import * as constants from '../constants'

export function sendFeedback(message){
	return {
		type: constants.FEEDBACK_MSG_REQUEST,
		payload: { message }
	}
}

export function clearFeedbackDisable(){
	return {
		type: constants.FEEDBACK_MSG_CLEAR_DISABLE
	}
}
