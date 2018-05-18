import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

function Auth (){
	return (
		<div className='navigation__page'>
			<div className='navigation__page--login'>
				<Button className='underline-btn'>
					<NavLink to='/login'>Login with you email</NavLink>
				</Button>
			</div>
			<Button.Group className='navigation__page--social-group'>
				<Button
					as='a'
					color='red'
					href='/auth/google'
				>
					Sign In with Google
				</Button>
				<Button.Or />
				<Button
					color='blue'
					href='/auth/facebook'
				>
					Login with Facebook
				</Button>
			</Button.Group>
		</div>
	)
}

export default Auth
