import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, TextArea } from 'semantic-ui-react'

import ContactsList from './ContactsList'
import * as actions from '../../actions'
import EditedInput from '../common/EditedInput'
import FileUploader from '../common/FileUploader'
import profileTranslation from '../../../translations/en/profile'

const propTypes = {
	profile: PropTypes.shape({
		userName: PropTypes.string.isRequired,
		location: PropTypes.string.isRequired,
		photoBase64: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		contacts: PropTypes.array.isRequired
	}).isRequired,
	dispatch: PropTypes.func.isRequired,
	isRequestEnable: PropTypes.bool.isRequired
}

class Profile extends Component {
	constructor(props){
		super(props)

		const { description } = props.profile

		this.state = {
			description
		}

		this.photoSaveBind = this.photoSave.bind(this)
		this.photoRemoveBind = this.photoRemove.bind(this)
		this.notifyErrorBind = this.notifyError.bind(this)
		this.userNameUpdateBind = this.userNameUpdate.bind(this)
		this.locationUpdateBind = this.locationUpdate.bind(this)
		this.descriptionChangeValueBind = this.descriptionChangeValue.bind(this)
		this.descriptionUpdateBind = this.descriptionUpdate.bind(this)
	}

	photoSave(photoBase64){
		console.log('saveImg photoBase64', photoBase64)
		this.props.dispatch(actions.photoSaveRequest(photoBase64))
	}

	photoRemove(){
		this.props.dispatch(actions.photoRemoveRequest())
	}

	notifyError(msg){
		this.props.dispatch(actions.delayedNotifier(msg))
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
		const { description } = this.state
		this.props.dispatch(actions.descriptionUpdate(description))
	}

	render(){
		const {
			desription: {
				namePlaceholder,
				locationPlaceholder,
				describePlaceholder,
				loadImagePlaceholder
			}
		} = profileTranslation
		const {
			description,
			photo
		} = this.state
		const { /*photo,*/
			isRequestEnable,
			dispatch,
			profile: {
				userName,
				location,
				contacts
			}
		} = this.props

		return (
			<div className='profile'>
				<div className='profile--description'>
					<div className='profile--top-container'>
						<div className='profile--photo'>
							<FileUploader
								imageSuccessHandler={this.photoSaveBind}
								imageErrorHandler={this.notifyErrorBind}
								placeholderText={loadImagePlaceholder}
								defaultImg={photo}
								width={180}
								height={180}
								removeHandler={this.photoRemoveBind}
								isUploadEnable={!isRequestEnable}
							/>
						</div>

						<div className='profile--user-info'>
							<EditedInput
								className='profile--user-name'
								value={userName}
								onBlur={this.userNameUpdateBind}
								placeholder={namePlaceholder}
							/>

							<EditedInput
								className='profile--user-location'
								value={location}
								placeholder={locationPlaceholder}
								onBlur={this.locationUpdateBind}
							/>
						</div>
					</div>

					<div className='profile-bottom-container'>
						<Form>
							<TextArea
								className='profile--user-description'
								autoHeight
								placeholder={describePlaceholder}
								rows={3}
								value={description}
								onChange={this.descriptionChangeValueBind}
								onBlur={this.descriptionUpdateBind}
							/>
						</Form>
					</div>
				</div>

				<div className='profile--contacts'>
					<ContactsList
						contactsList={contacts}
						dispatch={dispatch}
					/>
				</div>
			</div>
		)
	}
}

Profile.propTypes = propTypes

export default Profile
