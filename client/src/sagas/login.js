import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import { request } from '../services/api'
import history from '../containers/Routes/history'

export function* sendUserLoginData(action){
  const result = yield call(
		request.bind(this, '/login'), action.payload
	)

	const {
		confirming: { isItConfirmingProcess },
		profileCurrentUser,
		loginRegistrDetails
	} = result

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
}
export default function* watchSendUserLoginData(){
  yield takeEvery(constants.SEND_USER_LOGIN_DATA, sendUserLoginData)
}
