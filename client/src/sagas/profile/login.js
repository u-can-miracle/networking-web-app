import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'

import userProfileTranslation from '../../../translations/en/userProfile'

const {
	messages: { errors: { login } }
} = userProfileTranslation

export function loginUpdate(action){
	return sagaRequest(
		constants.LOGIN_UPDATE_RESPONSE,
		{ login: action.payload.login },
		'/profile/login/update',
		login,
		{
			type: constants.LOGIN_UPDATE_RESPONSE,
			payload: {
				login: action.payload.prevLogin
			}
		}
	)
}
export function* watchLoginUpdate(){
  yield takeEvery(constants.LOGIN_UPDATE_REQUEST, loginUpdate)
}
