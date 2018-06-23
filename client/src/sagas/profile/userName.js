import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'

import userProfileTranslation from '../../../translations/en/userProfile'

const {
	messages: { errors: { userName } }
} = userProfileTranslation

export function userNameUpdate(action){
	return sagaRequest(
		constants.USER_NAME_UPDATE_RESPONSE,
		{ userName: action.payload.userName },
		'/profile/username/update',
		userName,
		{
			type: constants.USER_NAME_UPDATE_RESPONSE,
			payload: {
				userName: action.payload.prevUserName
			}
		}
	)
}
export function* watchUserNameUpdate(){
  yield takeEvery(constants.USER_NAME_UPDATE_REQUEST, userNameUpdate)
}
