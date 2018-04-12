import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react'

import ValidationInput from '../common/ValidationInput'
import {
	isValidEmail,
	isEmpty
} from '../../services/validation'
import {
	getLengthWarning,
	getRequiredWarning
} from '../../services/validationNotification'
import { MIN_LENGTH } from '../../constants'
import {
	PASSWORD_FIELD_NAME,
	NOT_VALID_EMAIL,
	EMAIL_FIELD_NAME,
	ENTER_YOUR_PASSWORD,
	ENTER_YOUR_EMAIL
} from '../../constants'
import * as actions from '../../actions'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
}

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props)

		this.state = {
			isEmailInvalid: false,
			isPassInvalid: false,
			emailVal: '',
			passVal: '',
			validationMsgEmail: '',
			validationMsgPass: '',
		}

    this.clearAndValidateBind = this.clearAndValidate.bind(this)
		this.setValueToFieldEmailCall = this.setValueToField.call(this, 'emailVal')
		this.setValueToFieldPassCall = this.setValueToField.call(this, 'passVal')
		this.setValueToFieldCall = this.setValueToField.call(this, 'emailVal')
		this.clearEmailFieldBind = this.clearEmailField.bind(this)
		this.clearPassFieldBind = this.clearPassField.bind(this)
  }

	shouldComponentUpdate(/*nextProps, nextState*/){
		// TODO log props is isRequestEnable exist?
		return !this.props.isRequestEnable
	}

	componentWillReceiveProps(nextProps){
		const { isEmailWrong, isPassWrong, emailMsg, passMsg } = nextProps.profile

		this.setState((prevState, props) => {
			return {
				isEmailInvalid: props.isRequestEnable ? false : isEmailWrong,
				isPassInvalid: props.isRequestEnable ? false : isPassWrong,
				validationMsgEmail: emailMsg || '',
				validationMsgPass: passMsg || ''
			}
		})
	}

	setValueToField(field){
		return (e) => {
			const { value } = e.target
			this.setState((/*prevState, props*/) => {
				return { [field]: value }
			})
		}
	}

	validateAndLogin(){
		let { isPassInvalid, isEmailInvalid } = this.state
		let { validationMsgPass, validationMsgEmail } = this.state
		let { passVal, emailVal } = this.state

		if( isEmpty(passVal) ){
			isPassInvalid = true
			validationMsgPass = getRequiredWarning(PASSWORD_FIELD_NAME)
		} else if( passVal.length <= MIN_LENGTH ){
			const warning = getLengthWarning(MIN_LENGTH, PASSWORD_FIELD_NAME)
			isPassInvalid = true
			validationMsgPass = warning
		} else {
			isPassInvalid = false
			validationMsgPass = ''
		}

		if( isEmpty(emailVal) ){
			isEmailInvalid = true
			validationMsgEmail = getRequiredWarning(EMAIL_FIELD_NAME)
		} else if( isValidEmail(emailVal) === false ){
			isEmailInvalid = true
			validationMsgEmail = NOT_VALID_EMAIL
		} else {
			isEmailInvalid = false
			validationMsgEmail = ''
		}

		this.setState((/*prevState, props*/) => ({
			isPassInvalid: isPassInvalid,
			isEmailInvalid: isEmailInvalid,
			validationMsgPass: validationMsgPass,
			validationMsgEmail: validationMsgEmail
		}))

		if(!isPassInvalid && !isEmailInvalid){
			this.props.dispatch(
				actions.sendUserLoginData({ email: emailVal, password: passVal })
			)
		}
	}

	clearEmailField(){
		this.setState((/*prevState, props*/) => {
			return { isEmailInvalid: false }
		})
	}

	clearPassField(){
		this.setState((/*prevState, props*/) => {
			return { isPassInvalid: false }
		})
	}

	clearAndValidate(){
		this.clearEmailField()
		this.clearPassField()

		this.validateAndLogin()
	}

  render() {
    return (
			<Form onSubmit={this.clearAndValidateBind}>
				<Form.Field>
					<label>Email</label>
					<ValidationInput
						type='text'
						isInvalid={this.state.isEmailInvalid}
						validationMsg={this.state.validationMsgEmail}
						placeholder={ENTER_YOUR_EMAIL}
						onChangeWrapper={this.setValueToFieldEmailCall}
						onFocus={this.clearEmailFieldBind}
						onBlur={this.clearEmailFieldBind}
					/>
				</Form.Field>
				<Form.Field>
					<label>Password</label>
					<ValidationInput
						type='password'
						isInvalid={this.state.isPassInvalid}
						validationMsg={this.state.validationMsgPass}
						placeholder={ENTER_YOUR_PASSWORD}
						onChangeWrapper={this.setValueToFieldPassCall}
						onFocus={this.clearPassFieldBind}
						onBlur={this.clearPassFieldBind}
					/>
				</Form.Field>
				<Button type='submit'>Just in!</Button>
			</Form>
    )
  }
}

LoginForm.propTypes = propTypes
