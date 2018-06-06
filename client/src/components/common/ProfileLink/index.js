import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { requestUserProfileById } from '../../../actions'


const propTypes = {
	className: PropTypes.string,
	dispatch: PropTypes.func.isRequired,
	profileId: PropTypes.number.isRequired
}

function ProfileLink({ className, dispatch, profileId, children }){
	function loadProfile(ev){
		ev.preventDefault()
		dispatch(requestUserProfileById(profileId))
	}

	return	(
		<a
			href={`/profile/${profileId}`}
			className={classnames('profile-link', className)}
			onClick={loadProfile}
		>
			{children}
		</a>
	)
}

ProfileLink.propTypes = propTypes

export default ProfileLink
