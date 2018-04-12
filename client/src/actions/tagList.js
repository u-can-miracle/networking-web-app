import * as constants from '../constants'

export function addTagRequest(tagName, tagType, tagsNames){
	return {
		type: constants.TAG_ADD_REQUEST,
		payload: { tagName, tagType, tagsNames }
	}
}

export function removeTagRequest(userTagId, tagType, tagsNames){
	return {
		type: constants.TAG_REMOVE_REQUEST,
		payload: { userTagId, tagType, tagsNames }
	}
}
