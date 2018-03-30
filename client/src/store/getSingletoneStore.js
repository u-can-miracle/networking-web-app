import configureStore from './configureStore'
import { isBrowser } from '../services/helpers'

let store = null

export default function getSingletoneStore(){
	if(store){
		return store
	}


	if(isBrowser()){
		const preloadedState = window.__INITIAL_STATE__
		delete window.__INITIAL_STATE__

		store = configureStore(preloadedState)
	} else {
		store = configureStore()
	}

	return store
}
