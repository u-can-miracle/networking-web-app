import { all } from 'redux-saga/effects'

import watchNotifier from './notifier'
import watchSendUserLogout from './logout'
import watchSendUserLoginData from './login'
import watchSendUserRegistrationData from './registration'
import {
	watchSendTag,
	watchRemoveTag
} from './profile'
import { watchSearchTags } from './search'

export default function* rootSaga(){
  yield all([
		watchNotifier(),
		watchSendUserLogout(),
		watchSendUserLoginData(),
		watchSendUserRegistrationData(),
		watchSendTag(),
		watchRemoveTag(),
		watchSearchTags()
  ])
}
