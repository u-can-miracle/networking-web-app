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
		profile
	} = result

	if(!profile.isEmailWrong && !profile.isPassWrong){
		if(isItConfirmingProcess){
			yield put({
				type: constants.ENABLE_CONFIRM_PROCCESS
			})
		}

		history.push('/main')
	}

	yield put({
    type: constants.GET_USER_LOGIN_RESPONSE,
    payload: {
			profile
		}
  })
}
export default function* watchSendUserLoginData(){
  yield takeEvery(constants.SEND_USER_LOGIN_DATA, sendUserLoginData)
}
