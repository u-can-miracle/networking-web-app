import getSingletoneStore from '../store/getSingletoneStore'
import { LOADING_MESSAGE } from '../constants'
import { enableNotifier, disableNotifier } from '../actions'

const store = getSingletoneStore()

export function request(url, payload, method = 'POST') {
	store.dispatch(enableNotifier(LOADING_MESSAGE))
	// simulate delay
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			fetch(url, {
				method,
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				mode: 'same-origin',
				body: JSON.stringify(payload)
			}).then(function(response) {
				store.dispatch(disableNotifier())

				try {
					const result = response.json()
					resolve(result)
				} catch (err) {
					reject(err.message) //=> String
				}
			}, function(error) {
				reject(error.message) //=> String
			})
		}, 3000)
	})
}
