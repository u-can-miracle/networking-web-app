import {
	SEARCH_TAGS_RESPONSE
} from '../constants'

const initialState = {
	isSearchBtnClicked: false,
	searchResults: []
}

export default function searchReducer(state = initialState, action){
	switch (action.type) {
		case SEARCH_TAGS_RESPONSE:
			return { ...state, searchResults: action.payload, isSearchBtnClicked: true }

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
