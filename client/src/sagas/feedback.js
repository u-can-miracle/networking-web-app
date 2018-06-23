import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import * as api from '../services/api'
import { getNow } from '../services/utils'

import feedbackTranslation from '../../translations/en/feedback'

const { messages: { sent, error } } = feedbackTranslation

export function* sendFeedback(action){
	const { message } = action.payload

	try {
		yield call(
			api.callApi.bind(this, '/feedback'), { message }
		)

		yield put({
			type: constants.FEEDBACK_MSG_CLEAR_ENABLE
		})

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: { message: sent }
		})
	} catch(err){
		const { message, stack } = err
		api.errorReporter(getNow(), constants.ERROR_TYPE_ID_FRONT, message, stack)

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: { message: error }
		})
	}
}

export default function* watchFeedback(){
	yield takeEvery(constants.FEEDBACK_MSG_REQUEST, sendFeedback)
}
