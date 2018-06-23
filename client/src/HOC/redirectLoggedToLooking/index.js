import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

import { isBrowser } from '../../services/utils'

export default function loggedToLooking(LoggedComp, NotLoggedComp){
	const LoggedToLooking = isLogged => {
		if(isBrowser()){
			// navigate in browser for changing url path
			return (
				<div>
					{
						isLogged
							?
							<Redirect to='/main' />
							:
							NotLoggedComp
					}
				</div>
			)
		} else {
			// preload view from server for SEO
			return (
				<div>
					{
						isLogged
						?
						LoggedComp
						:
						NotLoggedComp
					}
				</div>
			)
		}
	}

	LoggedToLooking.propTypes = {
		isLogged: PropTypes.bool.isRequired
	}

	return LoggedToLooking
}
