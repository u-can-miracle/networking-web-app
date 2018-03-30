import React from 'react'
import { Tab } from 'semantic-ui-react'

import LoginForm from './LoginForm'
import RegForm from './RegForm'

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
				menu={{ secondary: true, pointing: true }}
				panes={panes}
			/>
		</div>
	)
}

export default Login
