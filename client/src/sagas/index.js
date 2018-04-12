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
	watchPhotoSave,
	watchPhotoRemove,
	watchUserNameUpdate,
	watchLocationUpdate,
	watchDescriptionUpdate,
	watchContactCreate,
	watchContactRemove,
	watchContactUpdate
} from './profile'

export default function* rootSaga(){
  yield all([
		watchNotifier(),
		watchSendUserLogout(),
		watchSendUserLoginData(),
		watchSendUserRegistrationData(),
		watchSendTag(),
		watchRemoveTag(),
		watchSearchTags(),
		watchPhotoSave(),
		watchPhotoRemove(),
		watchUserNameUpdate(),
		watchLocationUpdate(),
		watchDescriptionUpdate(),
		watchContactCreate(),
		watchContactRemove(),
		watchContactUpdate()
  ])
}
