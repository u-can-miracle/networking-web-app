import React from 'react'
import { Message } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

function Confirmation (){
	return (
		<div className='message__medium-size'>
			<Message>
				<Message.Header>
					Welcome!
				</Message.Header>
				<p>
					You have successfully confirmed you account!
				</p>
				<NavLink to='/main'>Back to main page</NavLink>
			</Message>
		</div>
	)
}

export default Confirmation
