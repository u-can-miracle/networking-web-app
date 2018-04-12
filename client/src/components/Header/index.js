import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Segment, Header as Heading, Button, Label } from 'semantic-ui-react'

import { sendUserLoguot } from '../../actions'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	userName: PropTypes.string,
	isLogged: PropTypes.bool.isRequired
}

function Header ({ dispatch, isLogged, userName }){
	function logout (){
		dispatch(sendUserLoguot())
	}

	return	(
		<Segment className='heading'>
			<Heading as='h3'
				floated='left'
				className='heading--title'
			>
				<NavLink to='/main'>Networking Service</NavLink>
			</Heading>
			{
				isLogged
				&&
				<div>
					<NavLink to='/profile'>
						<Label
							as='span'
							size='large'
						>
							Hi, {userName}
						</Label>
					</NavLink>
					<Button
						compact
						floated='right'
						onClick={logout}
					>
						Logout
					</Button>
				</div>
			}
		</Segment>
	)
}

Header.propTypes = propTypes

export default Header
