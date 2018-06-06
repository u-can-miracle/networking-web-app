import * as constants from '../constants'

export function requestUserProfileById(profileId){
	return {
		type: constants.USER_PROFILE_REQUEST,
		payload: { profileId }
	}
}
