export const isBrowser = () => typeof window !== 'undefined'

/**
 * Returns the sum of a and b
 * @param {Object} tagsList [{ tagName: '' }]
 * @returns {Array} ['']
 */
export const getTagsNamesList = tagsList => tagsList.map(tag => tag.tagName)

export const noop = () => {}

export const delay = duration => new Promise(resolve =>
	setTimeout(resolve, duration || 0)
)

export const getNow = () => new Date().getTime()
