import { put, call } from 'redux-saga/effects'

import * as constants from '../constants'
import * as api from './api'
import { getNow } from './utils'


export default function* sagaRequest(actionTypeResponse, payload, url, msg, failAction){
	let response
	try {
		response = yield call(
			api.callApi,
			url,
			{ ...payload }
		)

		if(response.data.isSuccessful){
			yield put({
				type: constants[actionTypeResponse],
				payload: { ...response.data.payload }
			})
		} else {

			if(failAction){
				yield put(failAction)
			}
		}
	} catch (err){
		api.errorReporter(getNow(), constants.ERROR_TYPE_ID_FRONT, err)

		if(failAction){
			yield put(failAction)
		}

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: { message: msg }
		})
	}
}
