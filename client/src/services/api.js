import getSingletoneStore from '../store/getSingletoneStore'
import { delay } from './utils'
import {
	LOADING_MESSAGE,
	ERROR_TYPE_ID_BACK
} from '../constants'
import { enableNotifier, disableNotifier } from '../actions'

const store = getSingletoneStore()

export async function request(url, payload, method = 'POST'){
	store.dispatch(enableNotifier(LOADING_MESSAGE))

	await delay(1200)

	const fetchResponse = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include',
		mode: 'same-origin',
		body: JSON.stringify(payload)
	})

	store.dispatch(disableNotifier())

	const { ok, statusText } = fetchResponse
	const data = await fetchResponse.json()

	return {
		data,
		ok,
		statusText,
		url,
		method
	}
}

export async function callApi(url, payload, method){
	const response = await request(url, payload, method)

	if(!response.ok){
		handleApiError(response)
	}

	return response
}

/**
 * @description Handle 400's and 500's statuses
 */
export async function handleApiError(response){
	const { data: { errorTime }, statusText, url } = response

	errorReporter(errorTime, ERROR_TYPE_ID_BACK, statusText, url)
}

export function errorReporter(time, errorTypeId, message, stack){
	const state = getSingletoneStore().getState()
	const { history: { history } } = state

	const toSend = {
		time,
		errorTypeId,
		message,
		stack: stack,
		history: JSON.stringify(history)
	}

	request('/error-report', toSend)
}
