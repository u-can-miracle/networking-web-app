import { ERROR_TYPE_ID_FRONT } from '../constants'
import { errorReporter } from './api'
import { getNow } from './utils'

window.onerror = function (msg, url, lineNo, columnNo, err) {
	// FRONT error
	const { message, stack } = err
	errorReporter(getNow(), ERROR_TYPE_ID_FRONT, message, stack)

	return false
}
