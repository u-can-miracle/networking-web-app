import { ENABLE_NOTIFIER, DISABLE_NOTIFIER } from '../constants'

const initialState = {
	isRequestEnable: false,
	message: ''
}

export default function notifierReducer(state = initialState, action){
	switch (action.type) {
		case ENABLE_NOTIFIER:
			return { ...state, isRequestEnable: true, message: action.payload.message }

		case DISABLE_NOTIFIER:
			return { ...state, isRequestEnable: false }

		default:
			return state
	}
}
