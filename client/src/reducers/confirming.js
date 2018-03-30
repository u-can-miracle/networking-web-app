import { ENABLE_CONFIRM_PROCCESS, DISABLE_CONFIRM_PROCCESS } from '../constants'

const initialState = {
	isItConfirmingProcess: false
}

export default function confirmingReducer(state = initialState, action){
	switch (action.type) {
		case ENABLE_CONFIRM_PROCCESS:
			return { isItConfirmingProcess: true }

		case DISABLE_CONFIRM_PROCCESS:
			return { isItConfirmingProcess: false }

		default:
			return state
	}
}
