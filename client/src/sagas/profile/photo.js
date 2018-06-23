import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'

import userProfileTranslation from '../../../translations/en/userProfile'

const {
	messages: { errors: { photo } }
} = userProfileTranslation

export function photoUpdate(action){
	const { photoBase64 } = action.payload

	return sagaRequest(
		constants.PHOTO_UPDATE_RESPONSE,
		{ photoBase64 },
		'/profile/photo/update',
		photo,
		{
			type: constants.PHOTO_UPDATE_RESPONSE,
			payload: {
				photoBase64: action.payload.prevPhotoBase64
			}
		}
	)
}
export function* watchPhotoUpdate(){
  yield takeEvery(constants.PHOTO_UPDATE_REQUEST, photoUpdate)
}
