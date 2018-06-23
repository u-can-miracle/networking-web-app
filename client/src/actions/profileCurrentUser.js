import * as constants from '../constants'

export function photoUpdateRequest(photoBase64, prevPhotoBase64){
	return {
		type: constants.PHOTO_UPDATE_REQUEST,
		payload: { photoBase64, prevPhotoBase64 }
	}
}

export function photoRemoveRequest(){
	return {
		type: constants.PHOTO_REMOVE_REQUEST
	}
}

export function loginUpdate(login, prevLogin){
	return {
		type: constants.LOGIN_UPDATE_REQUEST,
		payload: { login, prevLogin }
	}
}

export function userNameUpdate(userName, prevUserName){
	return {
		type: constants.USER_NAME_UPDATE_REQUEST,
		payload: { userName, prevUserName }
	}
}

export function locationUpdate(location, prevLocation){
	return {
		type: constants.LOCATION_UPDATE_REQUEST,
		payload: { location, prevLocation }
	}
}

export function descriptionUpdate(description, prevDescription){
	return {
		type: constants.DESCRIPTION_UPDATE_REQUEST,
		payload: { description, prevDescription }
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

export function contactUpdate(contactId, newContactValue, prevContactValue){
	return {
		type: constants.CONTACT_UPDATE_REQUEST,
		payload: { contactId, newContactValue, prevContactValue }
	}
}
