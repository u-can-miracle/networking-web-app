import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'

import userProfileTranslation from '../../../translations/en/userProfile'

const {
	messages: { errors: { description } }
} = userProfileTranslation

export function descriptionUpdate(action){
	return sagaRequest(
		constants.DESCRIPTION_UPDATE_RESPONSE,
		{ description: action.payload.description },
		'/profile/description/update',
		description,
		{
			type: constants.DESCRIPTION_UPDATE_RESPONSE,
			payload: {
				description: action.payload.prevDescription
			}
		}
	)
}
export function* watchDescriptionUpdate(){
  yield takeEvery(constants.DESCRIPTION_UPDATE_REQUEST, descriptionUpdate)
}
