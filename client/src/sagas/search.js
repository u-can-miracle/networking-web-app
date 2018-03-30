import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import * as api from '../services/api'

export function* searchTags(action){
	const tags = action.payload
	const matchedUsersResponse = yield call(api.request, '/search-tags', { tags })

	yield put({
		type: constants.SEARCH_TAGS_RESPONSE,
		payload: matchedUsersResponse
	})
}
export function* watchSearchTags(){
	yield takeEvery(constants.SEARCH_TAGS_REQUEST, searchTags)
}
