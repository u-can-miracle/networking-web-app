import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'


export function loginUpdate(action){
	const { login } = action.payload

	return sagaRequest(
		constants.LOGIN_UPDATE_RESPONSE, { login }, '/profile/login/update'
	)
}
export function* watchLoginUpdate(){
  yield takeEvery(constants.LOGIN_UPDATE_REQUEST, loginUpdate)
}
