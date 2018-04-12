import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import TagList from '../common/TagList'
import { LOOKING, OFFER } from '../../constants'

const propTypes = {
	userData: PropTypes.shape({
		userId: PropTypes.number.isRequired,
		login: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired
	}),
	dispatch: PropTypes.func.isRequired,
	isRequestEnable: PropTypes.bool.isRequired,
	isEditable: PropTypes.bool.isRequired,
	title: PropTypes.shape({
		[OFFER]: PropTypes.string.isRequired,
		[LOOKING]: PropTypes.string.isRequired
  }).isRequired,
	tags: PropTypes.shape({
		[OFFER]: PropTypes.arrayOf(PropTypes.shape({
			tagId: PropTypes.number.isRequired,
			tagName: PropTypes.string.isRequired
		})).isRequired,
		[LOOKING]: PropTypes.arrayOf(PropTypes.shape({
			tagId: PropTypes.number.isRequired,
			tagName: PropTypes.string.isRequired
		})).isRequired
  }).isRequired
}

function UserInfo(props){
	const {
		userData,
		dispatch,
		isRequestEnable,
		isEditable,
		title,
		tags,
		tags: { offer, looking }
	} = props

	return (
		<div className='max-with-limit'>
			{
				userData
				&&
				<div>
					{userData.login} {userData.email}
				</div>
			}
			<Grid
				divided={'vertically'}
				celled
			>
				<Grid.Row
					columns={2}
					className='row--relative'
				>
					<Grid.Column
						className='column--no-margin-bottom column--padding-bottom'
					>
						<TagList
							dispatch={dispatch}
							isRequestEnable={isRequestEnable}
							isEditable={isEditable}
							tags={tags}
							tagList={offer}
							tagType={OFFER}
							title={title[OFFER]}
						/>
					</Grid.Column>
					<Grid.Column
						className='column--no-margin-bottom column--padding-bottom'
					>
						<TagList
							dispatch={dispatch}
							isRequestEnable={isRequestEnable}
							isEditable={isEditable}
							tags={tags}
							tagList={looking}
							tagType={LOOKING}
							title={title[LOOKING]}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</div>
	)
}

UserInfo.propTypes = propTypes

export default UserInfo
