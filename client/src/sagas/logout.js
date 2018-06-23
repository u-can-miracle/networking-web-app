import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import { callApi, errorReporter } from '../services/api'
import history from '../containers/Routes/history'
import { getNow } from '../services/utils'

import loginTranslation from '../../translations/en/login'

const { logout: { error } } = loginTranslation

export function* sendUserLogout(){
	try {
		const result = yield call(
			callApi.bind(this, '/logout')
		)
		const { isLoggedOut } = result.data

		if(isLoggedOut){
			yield put({
				type: constants.USER_LOGGED_OUT
			})
			yield put({ // TODO: reset search result if it result exists
				type: constants.SEARCH_TAGS_RESPONSE,
				payload: []
			})
			history.push('/login')
		}
	} catch (err) {
		const { message, stack } = err
		errorReporter(getNow(), constants.ERROR_TYPE_ID_FRONT, message, stack)

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: {
				message: error
			}
		})
	}
}
export default function* watchSendUserLogout(){
  yield takeEvery(constants.SEND_USER_LOGOUT, sendUserLogout)
}
