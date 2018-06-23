import { takeEvery } from 'redux-saga/effects'

import * as constants from '../../constants'
import sagaRequest from '../../services/sagaRequest'

import userProfileTranslation from '../../../translations/en/userProfile'

const {
	messages: { errors: { contact: { create, remove, update } } }
} = userProfileTranslation

export function contactCreate(action){
	const { contactType, contactValue } = action.payload
	const contact = { contactType, contactValue }

	return sagaRequest(
		constants.CONTACT_CREATE_RESPONSE, contact, '/profile/contact/create', create
	)
}
export function* watchContactCreate(){
  yield takeEvery(constants.CONTACT_CREATE_REQUEST, contactCreate)
}


export function contactRemove(action){
	const { id } = action.payload

	return sagaRequest(
		constants.CONTACT_REMOVE_RESPONSE, { id }, '/profile/contact/remove', remove
	)
}
export function* watchContactRemove(){
  yield takeEvery(constants.CONTACT_REMOVE_REQUEST, contactRemove)
}


export function contactUpdate(action){
	const { contactId, newContactValue, prevContactValue } = action.payload
	const payload = {
		id: contactId,
		contactValue: newContactValue
	}

	return sagaRequest(
		constants.CONTACT_UPDATE_RESPONSE,
		payload,
		'/profile/contact/update',
		update,
		{
			type: constants.CONTACT_UPDATE_RESPONSE,
			payload: {
				id: contactId,
				contactValue: prevContactValue
			}
		}
	)
}
export function* watchContactUpdate(){
  yield takeEvery(constants.CONTACT_UPDATE_REQUEST, contactUpdate)
}
