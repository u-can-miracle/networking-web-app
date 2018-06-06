import * as constants from '../constants'
import {
	OFFER, LOOKING
}
from '../constants'

const initialState = {
	userName: '',
	userId: 0,
	email: '',
	location: '',
	photoBase64: '',
	description: '',

	contacts: [],

	tags: {
		[OFFER]: [], [LOOKING]: []
	}
}

export default function profileCurrentUserReducer(state = initialState, action) {
	switch (action.type) {
		case constants.PROFILE_CURRENT_USER_LOAD:
			return {
				...state,
				...action.payload.profileCurrentUser
			}

		case constants.USER_LOGGED_OUT:
			return {...state, isLogged: false
			}

		case constants.PHOTO_UPDATE_RESPONSE:
			return {...state, photoBase64: action.payload.photoBase64
			}

		case constants.LOGIN_UPDATE_RESPONSE:
			return {...state, login: action.payload.login
			}

		case constants.USER_NAME_UPDATE_RESPONSE:
			return {...state, userName: action.payload.userName
			}

		case constants.LOCATION_UPDATE_RESPONSE:
			return {...state, location: action.payload.location
			}

		case constants.DESCRIPTION_UPDATE_RESPONSE:
			return {...state, description: action.payload.description
			}

		case constants.CONTACT_CREATE_RESPONSE:
			const contacts = [...state.contacts, {...action.payload
			}]
			return {...state, contacts
			}

		case constants.CONTACT_REMOVE_RESPONSE:
			const filteredContacts = state.contacts.filter(
				contact => contact.id !== action.payload.id
			)

			return {...state, contacts: filteredContacts
			}

		case constants.CONTACT_UPDATE_RESPONSE:
			const updatedContacts = state.contacts.map(contact => {
				if (contact.id === action.payload.id) {
					return {
						id: contact.id,
						contactType: contact.contactType,
						contactValue: action.payload.contactValue
					}
				} else {
					return contact
				}
			})

			return {...state, contacts: updatedContacts
			}

		case constants.TAG_ADD_RESPONSE:
			const tagToAdd = {
				tagName: action.payload.tagName,
				userTagId: action.payload.userTagId,
				tagId: action.payload.tagId,
				tagType: action.payload.tagType
			}
			const updatedTagsAfterAdd = {
				...state.tags, [action.payload.tagType]: state.tags[action.payload.tagType]
					.concat([tagToAdd])
			}

			return {...state, tags: updatedTagsAfterAdd
			}

		case constants.TAG_REMOVE_RESPONSE:
			const {
				userTagId, tagType
			} = action.payload
			const updatedTagsAfterRemove = {
				...state.tags, [tagType]: state.tags[tagType].filter(tag => tag.userTagId !==
					userTagId)
			}

			return {...state, tags: updatedTagsAfterRemove
			}

		default:
			return state
	}
}
