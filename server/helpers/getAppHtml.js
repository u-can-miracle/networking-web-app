import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { AppContainer } from 'react-hot-loader'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'

import App from '../../client/src/containers/App'
import configureStore from '../../client/src/store/configureStore'


let defaultStore = configureStore()
let defaultState = defaultStore.getState()

export default function getAppHtml(url, initialPartialState = {}){
	const initialState = { ...defaultState, ...initialPartialState }
	const initialStore = configureStore(initialState)
  const context = {}
  const RootApp = (
									<AppContainer>
										<Provider store={initialStore}>
											<StaticRouter
												location={url}
												context={context}
											>
												<App />
											</StaticRouter>
										</Provider>
									</AppContainer>
									)

  const AppHtml = ReactDOMServer.renderToString(RootApp)
	const stringifiedInitState = JSON.stringify(initialState)

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Network (^_^)</title>
			<link rel="stylesheet" href="/bundle.css">
    </head>
    <body>
      <div id="root"><div>${AppHtml}</div></div>
			<script> window.__INITIAL_STATE__= ${stringifiedInitState}</script>
      <script src="/bundle.js"></script>
    </body>
    </html>
  `
}
