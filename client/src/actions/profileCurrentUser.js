import * as constants from '../constants'

export function photoUpdateRequest(photoBase64){
	return {
		type: constants.PHOTO_UPDATE_REQUEST,
		payload: { photoBase64 }
	}
}

export function photoRemoveRequest(){
	return {
		type: constants.PHOTO_REMOVE_REQUEST
	}
}

export function loginUpdate(login){
	return {
		type: constants.LOGIN_UPDATE_REQUEST,
		payload: { login }
	}
}

export function userNameUpdate(userName){
	return {
		type: constants.USER_NAME_UPDATE_REQUEST,
		payload: { userName }
	}
}

export function locationUpdate(location){
	return {
		type: constants.LOCATION_UPDATE_REQUEST,
		payload: { location }
	}
}

export function descriptionUpdate(description){
	return {
		type: constants.DESCRIPTION_UPDATE_REQUEST,
		payload: { description }
	}
}

export function contactCreate(contactType, contactValue){
	return {
		type: constants.CONTACT_CREATE_REQUEST,
		payload: { contactType, contactValue }
	}
}

export function contactRemove(id){
	return {
		type: constants.CONTACT_REMOVE_REQUEST,
		payload: { id } // safety deleting
	}
}

export function contactUpdate(contactId, newContactValue){
	return {
		type: constants.CONTACT_UPDATE_REQUEST,
		payload: { contactId, newContactValue } // safety deleting
	}
}
