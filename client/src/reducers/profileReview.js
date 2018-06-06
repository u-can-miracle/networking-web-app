import * as constants from '../constants'
import { OFFER, LOOKING } from '../constants'

const initialState = {
	userName: '',
	userId: '',
	email: '',
	location: '',
	photoBase64: '',
	description: '',

	contacts: [],

	tags: {
		[OFFER]: [],
		[LOOKING]: []
	}
}

export default function profileReviewReducer(state = initialState, action){
	switch (action.type) {
		case constants.PROFILE_REVIEW_RESPONSE:
			return { ...state, ...action.payload.profileReview }
		default:
			return state
	}
}
