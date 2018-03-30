import { combineReducers } from 'redux'

import notifier from './notifier'
import profile from './profile'
import searchResults from './searchResults'
import confirming from './confirming'

export default combineReducers({
	profile,
	searchResults,
	notifier,
	confirming
})
