import {
	SEARCH_TAGS_RESPONSE,
	SET_SEARCH_OFFER_TO_LOOKING,
	SET_SEARCH_OFFER_TO_OFFER
} from '../constants'

const initialState = {
	isSearchBtnClicked: false,
	isSearchOfferToLooking: true,
	searchResults: []
}

export default function searchReducer(state = initialState, action){
	switch (action.type) {
		case SEARCH_TAGS_RESPONSE:
			return { ...state, searchResults: action.payload, isSearchBtnClicked: true }

		case SET_SEARCH_OFFER_TO_LOOKING:
			return { ...state, isSearchOfferToLooking: true, searchResults: [] }

		case SET_SEARCH_OFFER_TO_OFFER:
			return {
				...state,
				isSearchOfferToLooking: false,
				searchResults: [],
				isSearchBtnClicked: false
			}

		default:
			return state
	}
}

// searchResults: [
// 	{
// 		userId: 1,
// 		login: 'userName1',
// 		email: 'email@gmail.com',
// 		tags: {
// 			[OFFER]: [{ userTagId, tagId, tagName }],
// 			[LOOKING]: [{ userTagId, tagId, tagName }]
// 		}
// 	},
// 	{
// 		userId: 2,
// 		login: 'userName2',
// 		email: 'email@gmail.com',
// 		tags: {
// 			[OFFER]: [{ userTagId, tagId, tagName }],
// 			[LOOKING]: [{ userTagId, tagId, tagName }]
// 		}
// 	}
// ]
