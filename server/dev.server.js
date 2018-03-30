import express from 'express'
import expressConfig from './config/express'
import config from './config'
import clientApi from './clientApi'


const app = express()


expressConfig(app)

clientApi(app)



app.listen(config.client.port, () => {
	console.log('dev.server starts')
})
