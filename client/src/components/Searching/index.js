import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'

import UserProfile from '../UserProfile'
import { searchTags } from '../../actions'
import { OFFER, LOOKING } from '../../constants'
import searchTrans from '../../../translations/en/search'
import { getTagsNamesList } from '../../services/helpers'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isRequestEnable: PropTypes.bool.isRequired,
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

class Searching extends Component {
	constructor(props){
		super(props)

		this.buildResultsListBind = this.buildResultsList.bind(this)
		this.searchMatchingBind = this.searchMatching.bind(this)
	}

	componentDidMount(){
		if(this.props.history.location.hash === '#_=_'){
			this.props.history.replace('/main')
		}
	}

	buildResultsList(){
		const {
			isRequestEnable,
			searchResults,
			dispatch
		} = this.props

		return searchResults.map(result => {
			const userData = {
				userId: result.userId,
				email: result.email,
				login: result.login
			}

			return (
				<UserProfile
					key={result.userId}
					userData={userData}
					dispatch={dispatch}
					isRequestEnable={isRequestEnable}
					isEditable={false}
					title={searchTrans.userProfile.title}
					tags={result.tags}
				/>
			)
		})
	}

	searchMatching(){
		const {
			userTags,
			dispatch
		} = this.props

		const tags = {
			[OFFER]: getTagsNamesList(userTags[OFFER]),
			[LOOKING]: getTagsNamesList(userTags[LOOKING])
		}

		dispatch(searchTags(tags))
	}

	render(){
		return (
			<div className='search-results'>
				<Button
					compact
					floated='right'
					onClick={this.searchMatchingBind}
				>
					{searchTrans.searchBtnText}
				</Button>

				<div>
					{this.buildResultsListBind()}
				</div>
			</div>
		)
	}
}

Searching.propTypes = propTypes

export default Searching
