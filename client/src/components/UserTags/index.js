import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import classnames from 'classnames'

import TagList from '../common/TagList'
import ProfileLink from '../common/ProfileLink'
import { LOOKING, OFFER } from '../../constants'
import searchTranslation from '../../../translations/en/search'

const { showDetails } = searchTranslation

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

function UserTags(props){
	const {
		userData,
		dispatch,
		isRequestEnable,
		isEditable,
		title,
		tags,
		tags: { offer, looking },
		className
	} = props

	return (
		<div className={classnames('max-with-limit', className)}>
			{
				userData
				&&
				<div>
					<span className='user-tags--login'>{userData.login}</span>
					<ProfileLink
						dispatch={dispatch}
						profileId={userData.userId}
					>
						{showDetails}
					</ProfileLink>
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

UserTags.propTypes = propTypes

export default UserTags
