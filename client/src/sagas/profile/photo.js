import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'


export function photoSave(action){
	const { photoBase64 } = action.payload

	return sagaRequest(
		constants.PHOTO_SAVE_RESPONSE, { photoBase64 }, '/profile/photo/save'
	)
}
export function* watchPhotoSave(){
  yield takeEvery(constants.PHOTO_SAVE_REQUEST, photoSave)
}


export function photoRemove(){
	return sagaRequest(
		constants.PHOTO_REMOVE_RESPONSE, {}, '/profile/photo/remove'
	)
}
export function* watchPhotoRemove(){
  yield takeEvery(constants.PHOTO_REMOVE_REQUEST, photoRemove)
}
