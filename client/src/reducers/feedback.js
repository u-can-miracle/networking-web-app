import {
	FEEDBACK_MSG_CLEAR_ENABLE,
	FEEDBACK_MSG_CLEAR_DISABLE
} from '../constants'

const initialState = {
	willClearFeedback: false
}

export default function feedbackReducer(state = initialState, action){
	switch (action.type) {
		case FEEDBACK_MSG_CLEAR_ENABLE:
			return { ...state, willClearFeedback: true }

		case FEEDBACK_MSG_CLEAR_DISABLE:
			return { ...state, willClearFeedback: false }

		default:
			return state
	}
}
