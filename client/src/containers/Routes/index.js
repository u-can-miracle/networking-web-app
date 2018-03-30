import React from 'react'
import PropTypes from 'prop-types'
import { Router } from 'react-router-dom'

import App from '../App'
import history from './history'


const propTypes = {
	history: PropTypes.object
}

function Routes(){
	return (
			<Router
				path='/'
				history={history}
			>
				<App />
			</Router>
	)
}

Routes.propTypes = propTypes

export default Routes
