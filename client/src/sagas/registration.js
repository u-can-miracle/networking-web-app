import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import * as api from '../services/api'
import history from '../containers/Routes/history'
import { getNow } from '../services/utils'

import loginTranslation from '../../translations/en/login'

const { registration: { error } } = loginTranslation

export function* sendUserRegistrationData(action){
	try {
		const response = yield call(
			api.callApi.bind(this, '/registration'), action.payload
		)
		const {
			isEmailUsed, isLoginUsed, loginMessage, emailMessage
		} = response.data

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
	} catch (err) {
		const { message, stack } = err
		api.errorReporter(getNow(), constants.ERROR_TYPE_ID_FRONT, message, stack)

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: {
				message: error
			}
		})
	}
}
export default function* watchSendUserRegistrationData(){
	yield takeEvery(constants.SEND_USER_REG_DATA, sendUserRegistrationData)
}
