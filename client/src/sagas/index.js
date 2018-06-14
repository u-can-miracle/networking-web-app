import { all } from 'redux-saga/effects'

import watchNotifier from './notifier'
import watchSendUserLogout from './logout'
import watchSendUserLoginData from './login'
import watchSendUserRegistrationData from './registration'
import {
	watchSendTag,
	watchRemoveTag
} from './tagList'
import { watchSearchTags } from './search'
import {
	watchPhotoUpdate,
	watchLoginUpdate,
	watchUserNameUpdate,
	watchLocationUpdate,
	watchDescriptionUpdate,
	watchContactCreate,
	watchContactRemove,
	watchContactUpdate
} from './profile'
import watchRequestUserProfileById from './profileReview'
import watchFeedback from './feedback'

export default function* rootSaga(){
  yield all([
		watchNotifier(),
		watchSendUserLogout(),
		watchSendUserLoginData(),
		watchSendUserRegistrationData(),
		watchSendTag(),
		watchRemoveTag(),
		watchSearchTags(),
		watchPhotoUpdate(),
		watchLoginUpdate(),
		watchUserNameUpdate(),
		watchLocationUpdate(),
		watchDescriptionUpdate(),
		watchContactCreate(),
		watchContactRemove(),
		watchContactUpdate(),
		watchRequestUserProfileById(),
		watchFeedback(),
  ])
}
