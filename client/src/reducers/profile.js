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

		case constants.ADD_TAG_RESPONSE:
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

		case constants.REMOVE_TAG_RESPONSE:
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
