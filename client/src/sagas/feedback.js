// import { delay } from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import * as api from '../services/api'

export function* sendFeedback(action){
	const { message } = action.payload

	try {
		yield call(
			api.request.bind(this, '/feedback'), { message }
		)

		yield put({
			type: constants.FEEDBACK_MSG_CLEAR_ENABLE
		})

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: { message: 'Feedback was sent' }
		})
	} catch(err){
		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: { message: 'Feedback sending error' }
		})
		console.log('saga feedback err', err)
	}
}

export default function* watchFeedback(){
	yield takeEvery(constants.FEEDBACK_MSG_REQUEST, sendFeedback)
}
