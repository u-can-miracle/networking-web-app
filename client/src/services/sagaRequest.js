import { put, call } from 'redux-saga/effects'

import * as constants from '../constants'
import * as api from './api'


export default function* sagaRequest(actionTypeResponse, payload, url){
	try {
		const response = yield call(
			api.request,
			url,
			{ ...payload }
		)

		const { isSuccessful } = response

		if(isSuccessful){
			yield put({
				type: constants[actionTypeResponse],
				payload: { ...response.payload }
			})
		} else {
			// TODO: call notifier handle not remove
		}
	} catch (err){
		// TODO: call notifier handle error
	} // catch
}
