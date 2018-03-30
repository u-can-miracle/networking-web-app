export function isBrowser(){
	return typeof window !== 'undefined'
}

/**
 * Returns the sum of a and b
 * @param {Object} tagsList [{ tagName: '' }]
 * @returns {Array} ['']
 */
export function getTagsNamesList(tagsList){
	return tagsList.map(tag => tag.tagName)
}
