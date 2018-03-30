import React from 'react'
import { Message } from 'semantic-ui-react'

function SuccessReg (){
	return (
		<div className='message__medium-size'>
			<Message>
				<Message.Header>
					You have successfully registered!
				</Message.Header>
				<p>
					Now please, visit your email address and confirm your account.
				</p>
			</Message>
		</div>
	)
}

export default SuccessReg
