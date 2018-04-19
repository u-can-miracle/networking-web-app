import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'


export function photoUpdate(action){
	const { photoBase64 } = action.payload

	return sagaRequest(
		constants.PHOTO_UPDATE_RESPONSE, { photoBase64 }, '/profile/photo/update'
	)
}
export function* watchPhotoUpdate(){
  yield takeEvery(constants.PHOTO_UPDATE_REQUEST, photoUpdate)
}
