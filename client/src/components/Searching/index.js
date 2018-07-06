import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, Icon, Label } from 'semantic-ui-react'
import classnames from 'classnames'

import UserTags from '../UserTags'
import {
	searchTags,
	setSearchOfferToLooking,
	setSearchOfferToOffer
} from '../../actions'
import { OFFER, LOOKING } from '../../constants'
import searchTrans from '../../../translations/en/search'
import { getTagsNamesList } from '../../services/utils'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isRequestEnable: PropTypes.bool.isRequired,
	isSearchOfferToLooking: PropTypes.bool.isRequired,
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

class Searching extends PureComponent {
	constructor(props){
		super(props)
		this.timer = null

		this.searchMatchingBind = this.searchMatching.bind(this)
		this.toggleSearchingBind = this.toggleSearching.bind(this)

		this.timer = setTimeout(this.searchMatchingBind, 5000)
	}

	componentWillReceiveProps(nextProps){
		if(this.props.isSearchOfferToLooking !== nextProps.isSearchOfferToLooking){
			if(this.timer){
				clearTimeout(this.timer)
			}
			this.timer = setTimeout(this.searchMatchingBind, 5000)
		}
	}

	searchMatching(){
		const {
			isRequestEnable, userTags, dispatch, isSearchOfferToLooking
		} = this.props

		if(isRequestEnable){
			return
		}

		let tags
		if(isSearchOfferToLooking){
			tags = {
				[OFFER]: getTagsNamesList(userTags[OFFER]),
				[LOOKING]: getTagsNamesList(userTags[LOOKING])
			}
		} else {
			tags = {
				[LOOKING]: getTagsNamesList(userTags[OFFER]),
				[OFFER]: getTagsNamesList(userTags[LOOKING])
			}
		}


		dispatch(searchTags(tags))
	}

	toggleSearching(){
		const { isSearchOfferToLooking, dispatch } = this.props

		if(isSearchOfferToLooking){
			dispatch(setSearchOfferToOffer())
		} else {
			dispatch(setSearchOfferToLooking())
		}
	}

	render(){
		const {
			isSearchBtnClicked,
			isSearchOfferToLooking,
			searchResults,
			dispatch,
			isRequestEnable
		} = this.props

		return (
			<div className='search-results max-with-limit'>
				<div
					className='search-results--buttons-block'
				>
					<Button
						className='search-results--toggle-btn'
						compact
						title={searchTrans.searchBtnTooltip}
						onClick={this.toggleSearchingBind}
						as='a'
						labelPosition='left'
					>
						<Label as='span' basic>
							{searchTrans.toggleSearchBtnText}
						</Label>
						<Button icon>
							<Icon name='exchange' />
						</Button>
					</Button>

					<h4
						className='search-results--toggle-btn-title'
					>
						{searchTrans.toggleSearchBtnTitle}
					</h4>

					<Button
						className='search-results--search-btn'
						compact
						onClick={this.searchMatchingBind}
					>
						{searchTrans.searchBtnText}
					</Button>
				</div>

				<Grid
					divided={'vertically'}
					className={classnames(
						'search-results--search-result-title',
						{ 'search-results--offer-to-looking': isSearchOfferToLooking }
					)}
					celled
				>
					<Grid.Row
						columns={2}
						className='row--relative'
					>
						<Grid.Column>
							<span className='opacity'>1</span>
							<span
								className='search-results--row-looking'
							>
								{searchTrans.userProfile.title.looking}
							</span>
						</Grid.Column>
						<Grid.Column>
							<span className='opacity'>1</span>
							<span
								className='search-results--row-offer'
							>
								{searchTrans.userProfile.title.offer}
							</span>
						</Grid.Column>
					</Grid.Row>
				</Grid>

				<div>
					{
						isSearchBtnClicked && !searchResults.length ? (
							<div
								className='search-results--empty-result'
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
										isSearchOfferToLooking={isSearchOfferToLooking}
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
}

Searching.propTypes = propTypes

export default Searching
