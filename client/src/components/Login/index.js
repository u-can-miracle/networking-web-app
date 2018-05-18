import React from 'react'
import { Tab, Button, Icon } from 'semantic-ui-react'

import LoginForm from './LoginForm'
import RegForm from './RegForm'
import loginTranslation from '../../../translations/en/login'

const { login: { fbLogin } } = loginTranslation

function Login (props){
	const panes = [
		{
			menuItem: 'Login to app',
			render: () => ( // eslint-disable-line react/no-multi-comp
				<Tab.Pane attached={false}>
					<LoginForm {...props} />
				</Tab.Pane>
			)
		},
		{
			menuItem: 'Registration',
			render: () => ( // eslint-disable-line react/no-multi-comp
				<Tab.Pane attached={false}>
					<RegForm {...props} />
				</Tab.Pane>
			)
		}
	]

	return (
		<div className='login__container'>
			<Tab
				className='login__tab-wrapper'
				menu={{ secondary: true, pointing: true }}
				panes={panes}
			/>


			<Button
				className='login__fb-btn'
				color='blue'
				href='/auth/facebook'
			>
				<Icon name='facebook' /> {fbLogin}
			</Button>
		</div>
	)
}

export default Login
