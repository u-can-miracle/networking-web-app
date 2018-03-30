import * as constants from '../constants'

export function sendUserLoginData(userData){
	return {
		type: constants.SEND_USER_LOGIN_DATA,
		payload: userData
	}
}

export function sendUserRegistrationData(userData){
	return {
		type: constants.SEND_USER_REG_DATA,
		payload: userData
	}
}
