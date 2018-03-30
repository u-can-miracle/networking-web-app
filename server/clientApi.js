import getSingletoneStore from '../client/src/store/getSingletoneStore'
import getAppHtml from './helpers/getAppHtml'

export default function clientApi(app) {
	app.post('/get-default-state', (req, res) => {
		const defaultState = getSingletoneStore().getState()

		res.json(defaultState)
	})

	app.post('/get-app-html', (req, res) => {
		const { url, initialPartialState } = req.body
		const AppHtml = getAppHtml(url, initialPartialState)

		res.json({ AppHtml })
	})
}
