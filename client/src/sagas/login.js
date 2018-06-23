import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import { callApi, errorReporter } from '../services/api'
import history from '../containers/Routes/history'
import { getNow } from '../services/utils'

import loginTranslation from '../../translations/en/login'

const { login: { error } } = loginTranslation

export function* sendUserLoginData(action){
	try {
		const result = yield call(
			callApi.bind(this, '/login'), action.payload
		)

		const {
			confirming: { isItConfirmingProcess },
			profileCurrentUser,
			loginRegistrDetails
		} = result.data

		const { isEmailWrong, isPassWrong } = loginRegistrDetails
		const isLogginSuccessfull = !isEmailWrong && !isPassWrong

		if(isLogginSuccessfull){
			if(isItConfirmingProcess){
				yield put({
					type: constants.ENABLE_CONFIRM_PROCCESS
				})
			}

			yield put({
				type: constants.PROFILE_CURRENT_USER_LOAD,
				payload: {
					profileCurrentUser
				}
			})

			history.push('/main')
		}

		yield put({
			type: constants.GET_USER_LOGIN_RESPONSE,
			payload: {
				loginRegistrDetails
			}
		})
	} catch (err) {
		const { message, stack } = err
		errorReporter(getNow(), constants.ERROR_TYPE_ID_FRONT, message, stack)

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: {
				message: error
			}
		})
	}
}
export default function* watchSendUserLoginData(){
  yield takeEvery(constants.SEND_USER_LOGIN_DATA, sendUserLoginData)
}
