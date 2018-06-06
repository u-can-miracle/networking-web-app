import { put, takeEvery, call } from 'redux-saga/effects'

import * as constants from '../constants'
import { request } from '../services/api'
import history from '../containers/Routes/history'

export function* requestUserProfileById(action){
	const { profileId } = action.payload
  const profileReview = yield call(
		request.bind(this, '/profile/get-by-id'), { profileId }
	)

	try {
		yield put({
			type: constants.PROFILE_REVIEW_RESPONSE,
			payload: {
				...profileReview
			}
		})

		history.push(`/profile/${profileId}`)
	} catch (err) {
		console.log(' err', err)
	}
}

export default function* watchRequestUserProfileById(){
  yield takeEvery(constants.USER_PROFILE_REQUEST, requestUserProfileById)
}
