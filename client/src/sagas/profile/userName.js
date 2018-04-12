import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'


export function userNameUpdate(action){
	const { userName } = action.payload

	return sagaRequest(
		constants.USER_NAME_UPDATE_RESPONSE, { userName }, '/profile/username/update'
	)
}
export function* watchUserNameUpdate(){
  yield takeEvery(constants.USER_NAME_UPDATE_REQUEST, userNameUpdate)
}
