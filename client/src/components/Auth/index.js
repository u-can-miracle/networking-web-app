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
				<Button color='red'>
					<a href='/auth/google'>Sign In with Google</a>
				</Button>
				<Button.Or />
				<Button color='blue'>
					<a href='/auth/facebook'>Login with Facebook</a>
				</Button>
			</Button.Group>
		</div>
	)
}

export default Auth
