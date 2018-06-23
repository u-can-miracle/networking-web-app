import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'semantic-ui-react'
import classnames from 'classnames'

import * as actions from '../../actions'
import EditedInput from '../common/EditedInput'
import SlideToggle from '../common/SlideToggle'

import profileTranslation from '../../../translations/en/profile'

const {
	contacts: { title, addBtnTitle, contactMethod, contact, noContacts }
} = profileTranslation


const openStylesForm = {
	opacity: 1,
	top: -10
}
const closeStylesForm = {  // destinational styles
	opacity: 0,
	top: 0
}


const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isEditable: PropTypes.bool.isRequired,
	contactsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    contactType: PropTypes.string.isRequired,
    contactValue: PropTypes.string.isRequired
  })).isRequired,
	isRequestEnable: PropTypes.bool.isRequired
}


class ContactsList extends PureComponent {
	constructor(props){
		super(props)

		this.state = {
			isAddStateEnable: false,
			contactType: '',
			contactValue: ''
		}

		this.enableAddStateBind = this.enableAddState.bind(this)
		this.disableAddStateBind = this.disableAddState.bind(this)
		this.contactCreateBind = this.contactCreate.bind(this)
		this.setContactType = this.setField.call(this, 'contactType')
		this.setContactValue = this.setField.call(this, 'contactValue')
	}

	enableAddState(){
		this.setState(() => ({
			isAddStateEnable: true
		}))
	}

  disableAddState(){
		this.setState(() => ({
			isAddStateEnable: false,
			contactType: '',
			contactValue: ''
		}))
  }

	contactRemove(id){
		this.props.dispatch(actions.contactRemove(id))
  }

  contactCreate(){
		const { contactType, contactValue } = this.state

		this.props.dispatch(actions.contactCreate(contactType, contactValue))
		this.disableAddState()
  }

	setField(field){
		return fieldValue => {
			this.setState(() => ({
				[field]: fieldValue
			}))
		}
	}

	contactUpdate(contactId, contactIndex){
		const { dispatch, contactsList } = this.props
		const oldContactValue = contactsList[contactIndex].contactValue

		return function(newContactValue){
			dispatch(actions.contactUpdate(contactId, newContactValue, oldContactValue))
		}
	}

	buildContacnts(){
		const { contactsList, isEditable, isRequestEnable } = this.props

		return contactsList.map((oneContact, index) => (
				<div
					className='contacts-list--editable-wrapper'
					key={oneContact.id}
				>
					<EditedInput
						className='contacts-list--editable'
						title={oneContact.contactType}
						value={oneContact.contactValue}
						isEditable={isEditable}
						// eslint-disable-next-line react/jsx-no-bind
						onBlur={this.contactUpdate.call(this, oneContact.id, index)}
						isRequestEnable={isRequestEnable}
					>
						<Icon
							className='contacts-list--remove-item-btn'
							key={oneContact.id}
							size='small'
							color='red'
							name='remove'
							fitted={false}
							// eslint-disable-next-line react/jsx-no-bind
							onClick={this.contactRemove.bind(this, oneContact.id)}
						/>
					</EditedInput>
				</div>
			)
		)
	}

	render(){
		const { contactsList, isEditable } = this.props
		const { isAddStateEnable, contactType, contactValue } = this.state

		return (
			<div className='contacts-list'>
				<div className='contacts-list--title'>
					<h5
						className='contacts-list--title-text'
						size='medium'
					>
						{title}
					</h5>
					{
						isEditable
							&&
						<Button
							className={
								classnames('contacts-list--add-btn', {
									'contacts-list--enabled-btn': !isAddStateEnable
								})
							}
							title={addBtnTitle}
							size='mini'
							icon
							onClick={this.enableAddStateBind}
						>
							<Icon
								size='small'
								name='plus'
								fitted={false}
							/>
						</Button>
					}

				</div>

				<div className='contacts-list--contacts'>
					{
						contactsList.length
							?
						this.buildContacnts()
							:
						noContacts
					}
				</div>

				<SlideToggle
					isOpen={isAddStateEnable}
					openStyles={openStylesForm}
					closeStyles={closeStylesForm}
				>
					<div className='contacts-list--add-form'>
						<Icon
							className='contacts-list--save-add-form-btn'
							size='small'
							color='green'
							name='checkmark'
							fitted={false}
							onClick={this.contactCreateBind}
						/>
						<Icon
							className='contacts-list--close-add-form-btn'
							size='small'
							color='red'
							name='close'
							fitted={false}
							// eslint-disable-next-line react/jsx-no-bind
							onClick={this.disableAddStateBind}
						/>
						<EditedInput
							className='contacts-list--editable'
							placeholder={contactMethod}
							value={contactType}
							isEditable={isEditable}
							onBlur={this.setContactType}
						/>
						<EditedInput
							className='contacts-list--editable'
							placeholder={contact}
							value={contactValue}
							isEditable={isEditable}
							onBlur={this.setContactValue}
						/>
					</div>
				</SlideToggle>
			</div>
		)
	}
}

ContactsList.propTypes = propTypes

export default ContactsList
