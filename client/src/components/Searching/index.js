import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

import UserTags from '../UserTags'
import { searchTags } from '../../actions'
import { OFFER, LOOKING } from '../../constants'
import searchTrans from '../../../translations/en/search'
import { getTagsNamesList } from '../../services/utils'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isRequestEnable: PropTypes.bool.isRequired,
	isSearchBtnClicked: PropTypes.bool.isRequired,
	userTags: PropTypes.shape({
		[OFFER]: PropTypes.arrayOf(PropTypes.shape({
			tagId: PropTypes.number.isRequired,
			tagName: PropTypes.string.isRequired
		})).isRequired,
		[LOOKING]: PropTypes.arrayOf(PropTypes.shape({
			tagId: PropTypes.number.isRequired,
			tagName: PropTypes.string.isRequired
		})).isRequired
  }).isRequired,
	searchResults: PropTypes.array.isRequired
}

function Searching({
	dispatch,
	isRequestEnable,
	isSearchBtnClicked,
	userTags,
	searchResults
}){
	function searchMatching(){
		const tags = {
			[OFFER]: getTagsNamesList(userTags[OFFER]),
			[LOOKING]: getTagsNamesList(userTags[LOOKING])
		}

		dispatch(searchTags(tags))
	}

	return (
		<div className='search-results'>
			<Button
				className='search-results--search-btn'
				compact
				onClick={searchMatching}
			>
				{searchTrans.searchBtnText}
			</Button>

			<div>
				{
					isSearchBtnClicked && !searchResults.length ? (
						<div
							className='search-results--empty-result max-with-limit'
						>
							{searchTrans.noSearchResults}
						</div>
					) : searchResults.map(result => {
						const userData = {
							userId: result.userId,
							email: result.email,
							login: result.login
						}

						return (
							<div
								key={result.userId}
								className='search-results--single-result'
							>
								<UserTags
									userData={userData}
									dispatch={dispatch}
									isRequestEnable={isRequestEnable}
									isEditable={false}
									title={searchTrans.userProfile.title}
									tags={result.tags}
								/>
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

Searching.propTypes = propTypes

export default Searching
