import express from 'express'
import webpack from 'webpack'
import bodyParser from 'body-parser'
import proxyMiddlware from 'http-proxy-middleware'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../../webpack.dev.config'
import config from './'
import filterUrls from '../helpers/filterUrls'

const compiler = webpack(webpackConfig)
const { client, api } = config

const proxy = proxyMiddlware(
	filterUrls,
	{
		target: `${api.protocol}://${api.url}:${api.port}`,
		// changeOrigin: true, // needed for virtual hosted site
		router: {
			// when request.headers.host == 'dev.localhost:3000',
			// override target 'http://www.example.org' to 'http://localhost:8000'
			[`${client.url}:${client.port}`] : `${api.protocol}://${api.url}:${api.port}`
		}
	}
)



export default function configExpressApp(app) {
	app.use(proxy)
  app.use(express.static('client/assets/')) // fonts
  app.use(express.static('client/assets/favicons'))
  app.use(express.static('client/dist')) // bundle.(js|css)

	app.use(bodyParser.json())

	app.use(webpackDevMiddleware(compiler, {
		publicPath: webpackConfig.output.publicPath,
		watchOptions: {
			aggregateTimeout: 750
		},
		quiet: true
	}))

	app.use(webpackHotMiddleware(compiler, {
		log: false,
		heartbeat: 2000
	}))
}
