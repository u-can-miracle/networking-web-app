import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'


export function descriptionUpdate(action){
	const { description } = action.payload

	return sagaRequest(
		constants.DESCRIPTION_UPDATE_RESPONSE, { description }, '/profile/description/update'
	)
}
export function* watchDescriptionUpdate(){
  yield takeEvery(constants.DESCRIPTION_UPDATE_REQUEST, descriptionUpdate)
}
