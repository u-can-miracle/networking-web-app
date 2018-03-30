import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import * as api from '../services/api'


export function* sendTag(action){
	const { tagName, tagType, tagsNames } = action.payload

	const response = yield call(
		api.request,
		'/profile/save-tag',
		{ tagName, tagType, tagsNames }
	)

	const { userTagId, tagId } = response

	yield put({
		type: constants.ADD_TAG_RESPONSE,
		payload: {
			tagName: response.tagName,
			userTagId,
			tagId,
			tagType
		}
	})
}
export function* watchSendTag(){
  yield takeEvery(constants.ADD_TAG_REQUEST, sendTag)
}


export function* removeTag(action){
	const { userTagId, tagType, tagsNames } = action.payload

	yield call(
		api.request,
		'/profile/remove-tag',
		{ userTagId, tagsNames }
	)

	yield put({
		type: constants.REMOVE_TAG_RESPONSE,
		payload: { userTagId, tagType }
	})
}
export function* watchRemoveTag(){
	yield takeEvery(constants.REMOVE_TAG_REQUEST, removeTag)
}
