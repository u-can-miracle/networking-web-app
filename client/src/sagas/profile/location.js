import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'

import userProfileTranslation from '../../../translations/en/userProfile'

const {
	messages: { errors: { location } }
} = userProfileTranslation

export function locationUpdate(action){
	return sagaRequest(
		constants.LOCATION_UPDATE_RESPONSE,
		{ location: action.payload.location },
		'/profile/location/update',
		location,
		{
			type: constants.LOCATION_UPDATE_RESPONSE,
			payload: {
				location: action.payload.prevLocation
			}
		}
	)
}
export function* watchLocationUpdate(){
  yield takeEvery(constants.LOCATION_UPDATE_REQUEST, locationUpdate)
}
