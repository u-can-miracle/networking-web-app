import * as constants from '../constants'

/**
 * @param {matchedUsersTags} Array [{ userId, login, email, tags: {offer: [''], looking: ['']} }]
 * @returns {action} Object
 */
export function searchTags(matchedUsersTags){
	return {
		type: constants.SEARCH_TAGS_REQUEST,
		payload: matchedUsersTags
	}
}
