import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Segment, Header as Heading, Button, Label } from 'semantic-ui-react'

import { sendUserLoguot } from '../../actions'
import headerTranslation from '../../../translations/en/header'

const { editProfile } = headerTranslation

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	userName: PropTypes.string,
	login: PropTypes.string,
	currentUserId: PropTypes.number,
	isLogged: PropTypes.bool.isRequired
}

function Header ({ dispatch, isLogged, userName, currentUserId, login }){
	function logout (){
		dispatch(sendUserLoguot())
	}

	const path = currentUserId ? `/profile/${currentUserId}` : ''

	return	(
		<Segment className='heading'>
			<Heading as='h3'
				floated='left'
				className='heading--title'
			>
			<NavLink to='/'>
				Networking Service
			</NavLink>

			</Heading>
			{
				isLogged
				&&
				<div>
					<span className='heading--user-name'>Hi, {userName || login}</span>
					<NavLink to={path}>
						<Label
							className='heading--profile-btn'
							as='span'
							size='large'
						>
							{editProfile}
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
