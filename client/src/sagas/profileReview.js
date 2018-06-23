import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import { callApi, errorReporter } from '../services/api'
import history from '../containers/Routes/history'
import { getNow } from '../services/utils'

import userProfileTranslation from '../../translations/en/userProfile'

const { messages: { errors: { requestProfile } } } = userProfileTranslation

export function* requestUserProfileById(action){
	const { profileId } = action.payload

	try {
		const profileReview = yield call(
			callApi.bind(this, '/profile/get-by-id'), { profileId }
		)

		yield put({
			type: constants.PROFILE_REVIEW_RESPONSE,
			payload: {
				...profileReview.data
			}
		})

		history.push(`/profile/${profileId}`)
	} catch (err) {
		const { message, stack } = err
		errorReporter(getNow(), constants.ERROR_TYPE_ID_FRONT, message, stack)

		yield put({
			type: constants.DELAYED_NOTIFIER,
			payload: {
				message: requestProfile
			}
		})
	}
}

export default function* watchRequestUserProfileById(){
  yield takeEvery(constants.USER_PROFILE_REQUEST, requestUserProfileById)
}
