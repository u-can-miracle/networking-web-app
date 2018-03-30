import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import * as api from '../services/api'
import history from '../containers/Routes/history'

export function* sendUserRegistrationData(action){
	const response = yield call(
		api.request.bind(this, '/registration'), action.payload
	)
	const { isEmailUsed, isLoginUsed, loginMessage, emailMessage } = response

	yield put({
		type: constants.GET_USER_REG_RESPONSE,
		payload: {
			isEmailUsed,
			isLoginUsed,
			loginMessage,
			emailMessage
		}
	})

	const isRegSuccess = !isEmailUsed && !isLoginUsed

	if(isRegSuccess){
		history.push('/success-reg')
		put({ type: constants.REG_SUCCESS })
	}
}
export default function* watchSendUserRegistrationData(){
	yield takeEvery(constants.SEND_USER_REG_DATA, sendUserRegistrationData)
}
