import * as constants from '../constants'

const initialState = {
	isEmailUsed: false,
	isLoginUsed: false,
	loginMessage: '',
	emailMessage: '',

	isEmailWrong: false,
	isPassWrong: false,
	emailMsg: '',
	passMsg: '',

	isLogged: false
}

export default function profileReducer(state = initialState, action){
	switch (action.type) {
		case constants.SEND_USER_LOGIN_DATA:
			return { ...state }

		case constants.GET_USER_LOGIN_RESPONSE:
			return { ...action.payload.loginRegistrDetails }

		case constants.SEND_USER_REG_DATA:
			return { ...state, 	isEmailUsed: false,	isLoginUsed: false }


		case constants.GET_USER_REG_RESPONSE:
			return {
				...state,
				isEmailUsed: action.payload.isEmailUsed,
				isLoginUsed: action.payload.isLoginUsed,
				loginMessage: action.payload.loginMessage,
				emailMessage: action.payload.emailMessage
			}

		case constants.USER_LOGGED_IN:
			return {
				...state,
				isLogged: true
			}

		case constants.USER_LOGGED_OUT:
			return { ...state, isLogged: false }

		default:
			return state
	}
}
