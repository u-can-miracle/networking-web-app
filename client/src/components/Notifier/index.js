import React from 'react'
import PropTypes from 'prop-types'
import { Message } from 'semantic-ui-react'

import SlideToggle from '../common/SlideToggle'

const propTypes = {
	isRequestEnable: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
}

function Notifier ({ message, isRequestEnable }){
	const openStyles = {
		opacity: 1,
		top: 12
	}
	const closeStyles = {  // destinational styles
		opacity: 0,
		top: 2
	}

	return (
		<div className='notifier'>
			<SlideToggle
				isOpen={isRequestEnable}
				openStyles={openStyles}
				closeStyles={closeStyles}
			>
				<Message
					className='notifier--body'
					info
					floating
					content={message}
				/>
			</SlideToggle>
		</div>
	)
}

Notifier.propTypes = propTypes


export default Notifier
