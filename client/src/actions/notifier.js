import * as constants from '../constants'

export function enableNotifier(message){
	return {
		type: constants.ENABLE_NOTIFIER,
		payload: { message }
	}
}

export function disableNotifier(){
	return {
		type: constants.DISABLE_NOTIFIER
	}
}

export function delayedNotifier(message){
	return {
		type: constants.DELAYED_NOTIFIER,
		payload: { message }
	}
}
