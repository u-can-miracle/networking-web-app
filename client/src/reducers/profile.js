import * as constants from '../constants'
import { OFFER, LOOKING } from '../constants'

const initialState = {
	isEmailUsed: false,
	isLoginUsed: false,
	loginMessage: '',
	emailMessage: '',

	isEmailWrong: false,
	isPassWrong: false,
	emailMsg: '',
	passMsg: '',

	userName: '',
	email: '',
	location: '',
	description: '',

	photoBase64: '',
	contacts: [
		// { id: 1, contactType: 'email', contactValue: 'cloudsmoonlight@gmail.com' },
		// { id: 2, contactType: 'skype', contactValue: 'pitline3' }
	],

	isLogged: false,

	tags: {
		[OFFER]: [],
		[LOOKING]: []
	}
}

export default function profileReducer(state = initialState, action){
	switch (action.type) {
		case constants.SEND_USER_LOGIN_DATA:
			return { ...state }

		case constants.GET_USER_LOGIN_RESPONSE:
			return { ...action.payload.profile }

		case constants.SEND_USER_REG_DATA:
			return { ...state, 	isEmailUsed: false,	isLoginUsed: false }


		case constants.GET_USER_REG_RESPONSE:
			return {
				...state,
				isEmailUsed: action.payload.isEmailUsed,
				isLoginUsed: action.payload.isLoginUsed,
				loginMessage: action.payload.loginMessage,
				emailMessage: action.payload.emailMessage
			}

		case constants.LOAD_USER_INFO:
			return {
				...state,
				isLogged: true,
				tags: { ...action.payload.tags }
			}

		case constants.USER_LOGGED_OUT:
			return { ...state, isLogged: false }

		case constants.PHOTO_UPDATE_RESPONSE:
			return { ...state, photoBase64: action.payload.photoBase64 }

		case constants.USER_NAME_UPDATE_RESPONSE:
			return { ...state, userName: action.payload.userName }

		case constants.LOCATION_UPDATE_RESPONSE:
			return { ...state, location: action.payload.location }

		case constants.DESCRIPTION_UPDATE_RESPONSE:
			return { ...state, description: action.payload.description }

		case constants.CONTACT_CREATE_RESPONSE:
			const contacts = [ ...state.contacts, { ...action.payload }]
			return { ...state, contacts }

		case constants.CONTACT_REMOVE_RESPONSE:
			const filteredContacts = state.contacts.filter(
				contact => contact.id !== action.payload.id
			)

			return { ...state, contacts: filteredContacts }

		case constants.CONTACT_UPDATE_RESPONSE:
			const updatedContacts = state.contacts.map(contact => {
				if(contact.id === action.payload.id){
					return {
						id: contact.id,
						contactType: contact.contactType,
						contactValue: action.payload.contactValue
					}
				} else {
					return contact
				}
			})

			return { ...state, contacts: updatedContacts }

		case constants.TAG_ADD_RESPONSE:
			const tagToAdd = {
				tagName: action.payload.tagName,
				userTagId: action.payload.userTagId,
				tagId: action.payload.tagId,
				tagType: action.payload.tagType
			}
			const updatedTagsAfterAdd = {
				...state.tags,
				[action.payload.tagType]: state.tags[action.payload.tagType]
					.concat([ tagToAdd ])
			}

			return { ...state, tags: updatedTagsAfterAdd }

		case constants.TAG_REMOVE_RESPONSE:
			const { userTagId, tagType } = action.payload
			const updatedTagsAfterRemove = {
				...state.tags,
				[tagType]: state.tags[tagType].filter(tag => tag.userTagId !== userTagId)
			}

			return { ...state, tags: updatedTagsAfterRemove }

		default:
			return state
	}
}
