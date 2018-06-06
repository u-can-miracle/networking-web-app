import { combineReducers } from 'redux'

import notifier from './notifier'
import profileCurrentUser from './profileCurrentUser'
import profileReview from './profileReview'
import loginRegistrDetails from './loginRegistrDetails'
import search from './search'
import confirming from './confirming'

export default combineReducers({
	profileCurrentUser,
	profileReview,
	loginRegistrDetails,
	search,
	notifier,
	confirming
})
