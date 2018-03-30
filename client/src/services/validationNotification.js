import {
	LENGTH_VALIDATION_START,
	LENGTH_VALIDATION_END,
	LENGTH_VALIDATION_ENDING,
	IS_REQUIRED
} from '../constants'

export function getRequiredWarning(fieldName){
	return fieldName + ' ' + IS_REQUIRED
}


export function getLengthWarning(lengthNumber, field){
	const ending = lengthNumber > 1 ? LENGTH_VALIDATION_ENDING : ''
	return field + ' ' + LENGTH_VALIDATION_START + ' ' +
				lengthNumber + ' ' + LENGTH_VALIDATION_END + ending
}
