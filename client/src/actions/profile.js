import * as constants from '../constants'

export function addTagRequest(tagName, tagType, tagsNames){
	return {
		type: constants.ADD_TAG_REQUEST,
		payload: { tagName, tagType, tagsNames }
	}
}

export function removeTagRequest(userTagId, tagType, tagsNames){
	return {
		type: constants.REMOVE_TAG_REQUEST,
		payload: { userTagId, tagType, tagsNames }
	}
}
