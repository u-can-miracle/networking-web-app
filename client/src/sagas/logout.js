import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import { request } from '../services/api'
import history from '../containers/Routes/history'

export function* sendUserLogout(){
	try {
		const result = yield call(
			request.bind(this, '/logout')
		)
		const { isLoggedOut } = result

		if(isLoggedOut){
			yield put({
				type: constants.USER_LOGGED_OUT
			})
			yield put({ // reset search result
				type: constants.SEARCH_TAGS_RESPONSE,
				payload: []
			})
			history.push('/login')
		}
	} catch (err) {
		console.log('saga sendUserLogout err', err)
	}
}
export default function* watchSendUserLogout(){
  yield takeEvery(constants.SEND_USER_LOGOUT, sendUserLogout)
}
