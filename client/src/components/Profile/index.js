import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, TextArea } from 'semantic-ui-react'

import UserTags from '../UserTags'
import ContactsList from './ContactsList'
import * as actions from '../../actions'
import { LOOKING, OFFER } from '../../constants'
import EditedInput from '../common/EditedInput'
import FileUploader from '../common/FileUploader'

import searchTrans from '../../../translations/en/search'
import profileTranslation from '../../../translations/en/profile'
import userProfileTrans from '../../../translations/en/userProfile'

const {
	title,
	desription: {
		namePlaceholderEnable,
		namePlaceholderDisabled,
		locationPlaceholderEditable,
		locationPlaceholderDisabled,
		describePlaceholder,
		loadImagePlaceholder,
		noDescription
	}
} = profileTranslation

const propTypes = {
	profile: PropTypes.shape({
		userName: PropTypes.string.isRequired,
		userId: PropTypes.number.isRequired,
		email: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		photoBase64: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		contacts: PropTypes.array.isRequired,
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
	}).isRequired,
	isEditable: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
	isRequestEnable: PropTypes.bool.isRequired
}

class Profile extends Component {
	constructor(props){
		super(props)

		const { profile: { description }, isEditable } = props

		this.state = {
			description: isEditable ? description : (!description && noDescription)
		}

		this.tagsTitles = isEditable ? userProfileTrans.title : searchTrans.userProfile.title

		this.photoSaveBind = this.photoSave.bind(this)
		this.photoRemoveBind = this.photoRemove.bind(this)
		this.notifyErrorBind = this.notifyError.bind(this)
		this.loginUpdateBind = this.loginUpdate.bind(this)
		this.userNameUpdateBind = this.userNameUpdate.bind(this)
		this.locationUpdateBind = this.locationUpdate.bind(this)
		this.descriptionChangeValueBind = this.descriptionChangeValue.bind(this)
		this.descriptionUpdateBind = this.descriptionUpdate.bind(this)
	}

	photoSave(photoBase64){
		this.props.dispatch(actions.photoUpdateRequest(photoBase64))
	}

	photoRemove(){
		this.props.dispatch(actions.photoUpdateRequest(''))
	}

	notifyError(msg){
		this.props.dispatch(actions.delayedNotifier(msg))
	}

	loginUpdate(login){
		this.props.dispatch(actions.loginUpdate(login))
	}

	userNameUpdate(userName){
		this.props.dispatch(actions.userNameUpdate(userName))
	}

	locationUpdate(location){
		this.props.dispatch(actions.locationUpdate(location))
	}

	descriptionChangeValue(ev){
		const { value } = ev.target

		this.setState(() => ({
			description: value
		}))
	}

	descriptionUpdate(){
		if(this.props.profile.description === this.state.description){
			return
		}
		const { description } = this.state
		this.props.dispatch(actions.descriptionUpdate(description))
	}

	render(){
		const {
			description
		} = this.state
		const {
			isRequestEnable,
			dispatch,
			isEditable,
			profile: {
				userName,
				login,
				email,
				location,
				contacts,
				photoBase64,
				tags
			}
		} = this.props

		return (
			<div className='profile'>
				<div className='profile--info'>
					<div className='profile--description'>
						<div className='profile--top-container'>
							<div className='profile--photo'>
								<FileUploader
									imageSuccessHandler={this.photoSaveBind}
									imageErrorHandler={this.notifyErrorBind}
									placeholderText={loadImagePlaceholder}
									defaultImg={photoBase64}
									width={180}
									height={180}
									removeHandler={this.photoRemoveBind}
									isUploadEnable={isEditable && !isRequestEnable}
								/>
							</div>

							<div className='profile--user-info'>
								<EditedInput
									className='profile--user-detail'
									title={title.login}
									value={login}
									isEditable={isEditable}
									onBlur={this.loginUpdateBind}
									placeholder={namePlaceholderEnable}
								/>

								<EditedInput
									className='profile--user-detail'
									title={title.userName}
									value={userName || namePlaceholderDisabled}
									isEditable={isEditable}
									onBlur={this.userNameUpdateBind}
									placeholder={namePlaceholderEnable}
								/>

								<EditedInput
									className='profile--user-detail'
									title={title.location}
									value={location || locationPlaceholderDisabled}
									isEditable={isEditable}
									placeholder={locationPlaceholderEditable}
									onBlur={this.locationUpdateBind}
								/>

								<div className='profile--user-email'>
									<span
										className='profile--user-email-title'
									>
										{title.emailAddress}:
									</span>
									<span>{email}</span>
								</div>
							</div>
						</div>

						<div className='profile-bottom-container'>
							<Form>
								<span
									className='profile--user-description--title'
								>
									{title.description}
								</span>

								{
									isEditable
										?
									<TextArea
										className='profile--user-description'
										autoHeight
										placeholder={describePlaceholder}
										rows={3}
										value={description}
										onClick={this.preventEditableBind}
										onChange={this.descriptionChangeValueBind}
										onBlur={this.descriptionUpdateBind}
									/>
										:
									<div className='profile--user-description--readonly'>
										{description}
									</div>
								}
							</Form>
						</div>
					</div>

					<div className='profile--contacts'>
						<ContactsList
							contactsList={contacts}
							isEditable={isEditable}
							dispatch={dispatch}
						/>
					</div>
				</div>
				<UserTags
					className='profile--tags'
					isEditable
					isRequestEnable={isRequestEnable}
					dispatch={dispatch}
					title={this.tagsTitles}
					tags={tags}
				/>
			</div>
		)
	}
}

Profile.propTypes = propTypes

export default Profile
