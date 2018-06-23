import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import * as api from '../services/api'
import { getNow } from '../services/utils'

import tagListTranslation from '../../translations/en/tagList.json'

const { messages: { saveTagError, removeTagError } } = tagListTranslation

export function* sendTag(action){
	const { tagName, tagType, tagsNames } = action.payload

	try {
		const response = yield call(
			api.callApi,
			'/profile/tag/save',
			{ tagName, tagType, tagsNames }
		)

		const { userTagId, tagId } = response.data

		yield put({
			type: constants.TAG_ADD_RESPONSE,
			payload: {
				tagName: response.data.tagName,
				userTagId,
				tagId,
				tagType
			}
		})
	} catch (err) {
		const { message, stack } = err
		api.errorReporter(getNow(), constants.ERROR_TYPE_ID_FRONT, message, stack)

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: {
				message: saveTagError
			}
		})
	}
}
export function* watchSendTag(){
  yield takeEvery(constants.TAG_ADD_REQUEST, sendTag)
}


export function* removeTag(action){
	const { userTagId, tagType, tagsNames } = action.payload

	try {
		yield call(
			api.callApi,
			'/profile/tag/remove',
			{ userTagId, tagsNames }
		)

		yield put({
			type: constants.TAG_REMOVE_RESPONSE,
			payload: { userTagId, tagType }
		})
	} catch (err) {
		const { message, stack } = err
		api.errorReporter(getNow(), constants.ERROR_TYPE_ID_FRONT, message, stack)

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: {
				message: removeTagError
			}
		})
	}
}
export function* watchRemoveTag(){
	yield takeEvery(constants.TAG_REMOVE_REQUEST, removeTag)
}
