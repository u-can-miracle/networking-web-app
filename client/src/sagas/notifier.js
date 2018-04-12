import { delay } from 'redux-saga'
import { put, takeEvery, call } from 'redux-saga/effects'

import {
	DELAYED_NOTIFIER,
	ENABLE_NOTIFIER,
	DISABLE_NOTIFIER
} from '../constants'

export function* notifier(action){
	const { payload: { message } } = action

	yield put({
		type: ENABLE_NOTIFIER,
		payload: { message }
	})

	yield call(delay, 7500)

	yield put({
		type: DISABLE_NOTIFIER
	})
}
export default function* watchNotifier(){
	yield takeEvery(DELAYED_NOTIFIER, notifier)
}
