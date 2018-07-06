import * as constants from '../constants'

/**
 * @param {tags} Array [{ userId, login, email, tags: {offer: [''], looking: ['']} }]
 * @returns {action} Object
 */
export function searchTags(tags){
	return {
		type: constants.SEARCH_TAGS_REQUEST,
		payload: tags
	}
}

export function setSearchOfferToLooking(){
	return {
		type: constants.SET_SEARCH_OFFER_TO_LOOKING
	}
}

export function setSearchOfferToOffer(){
	return {
		type: constants.SET_SEARCH_OFFER_TO_OFFER
	}
}
