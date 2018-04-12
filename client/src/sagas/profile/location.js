import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'


export function locationUpdate(action){
	const { location } = action.payload

	return sagaRequest(
		constants.LOCATION_UPDATE_RESPONSE, { location }, '/profile/location/update'
	)
}
export function* watchLocationUpdate(){
  yield takeEvery(constants.LOCATION_UPDATE_REQUEST, locationUpdate)
}
