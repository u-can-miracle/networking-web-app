import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import * as api from '../services/api'
import { getNow } from '../services/utils'

import searchTranslation from '../../translations/en/search'

const { messages: { searchError } } = searchTranslation

export function* searchTags(action){
	const tags = action.payload

	try {
		const matchedUsersResponse = yield call(api.callApi, '/tag/search', { tags })

		yield put({
			type: constants.SEARCH_TAGS_RESPONSE,
			payload: matchedUsersResponse.data
		})
	} catch (err) {
		const { message, stack } = err
		api.errorReporter(getNow(), constants.ERROR_TYPE_ID_FRONT, message, stack)

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: {
				message: searchError
			}
		})
	}
}
export function* watchSearchTags(){
	yield takeEvery(constants.SEARCH_TAGS_REQUEST, searchTags)
}
