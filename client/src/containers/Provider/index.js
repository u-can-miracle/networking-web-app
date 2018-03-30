import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'

import Routes from '../Routes'

const propTypes = {
	store: PropTypes.object.isRequired
}

function ProviderWrapper({ store }) {
	return (
		<div>
			<Provider store={store}>
				<Routes />
			</Provider>
		</div>
	)
}

ProviderWrapper.propTypes = propTypes

export default ProviderWrapper
