import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'semantic-ui-react'

import ValidationInput from '../common/ValidationInput'
import { isValidEmail, isEmpty } from '../../services/validation'
import {
	getLengthWarning,
	getRequiredWarning
} from '../../services/validationNotification'
import { MIN_LENGTH } from '../../constants'
import {
	LOGIN_FIELD_NAME,
	EMAIL_FIELD_NAME,
	PASSWORD_FIELD_NAME,
	ENTER_YOUR_PASSWORD,
	ENTER_YOUR_EMAIL,
	CONFIRM_PASS,
	NOT_VALID_EMAIL,
	PASS_EQUAL
} from '../../constants'
import * as actions from '../../actions'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isRequestEnable: PropTypes.bool.isRequired,
	loginRegistrDetails: PropTypes.object.isRequired
}

export default class RegForm extends PureComponent {
	constructor(props){
		super(props)

		this.state = {
			loginVal: '',
			emailVal: '',
			passVal: '',
			passConfirmVal: '',

			validationMsgLogin: '',
			validationMsgEmail: '',
			validationMsgPass: '',
			validationMsgPassConfirm: '',

			isLoginInvalid: false,
			isEmailInvalid: false,
			isPassInvalid: false,
			isConfirmPassInvalid: false
		}

		this.clearAndValidateBind = this.clearAndValidate.bind(this)

		this.clearLoginBind = this.clearLoginField.bind(this)
		this.clearEmailFieldBind = this.clearEmailField.bind(this)

		this.setValueToLoginCall = this.setValueToField.call(this, 'loginVal')
		this.setValueToEmailCall = this.setValueToField.call(this, 'emailVal')
		this.setValueToPassCall = this.setValueToField.call(this, 'passVal')
		this.setValueToPassConfirmCall =
			this.setValueToField.call(this, 'passConfirmVal')

		this.clearInvalidPassBind =
			this.clearInvalidField.bind(this, 'isPassInvalid')
		this.clearInvalidConfirmPassBind =
			this.clearInvalidField.bind(this, 'isConfirmPassInvalid')
	}

	componentWillReceiveProps(nextProps){
		const {
			isEmailUsed,
			isLoginUsed,
			loginMessage,
			emailMessage
		} = nextProps.loginRegistrDetails

		this.setState((/*prevState, props*/) => {
			return {
				isLoginInvalid: this.props.isRequestEnable ? false : isLoginUsed,
				isEmailInvalid: this.props.isRequestEnable ? false : isEmailUsed,
				validationMsgLogin: loginMessage || '',
				validationMsgEmail: emailMessage || ''
			}
		})
	}

	componentWillUnmount(){
		this.clearAllValidatedFields()
	}

	setValueToField(field){
		return (e) => {
			const value = e.target.value.trim()
			this.setState((/*prevState, props*/) => {
				return { [field]: value }
			})
		}
	}

	clearInvalidField(field){
		this.setState((/*prevState, props*/) => {
			return { [field]: false }
		})
	}

	validateAndReg(ev){
		ev.preventDefault()

		let {
			isLoginInvalid,
			isEmailInvalid ,
			isPassInvalid,
			isConfirmPassInvalid,
			validationMsgLogin,
			validationMsgEmail,
			validationMsgPass,
			validationMsgPassConfirm
		} = this.state
		let { loginVal, emailVal, passVal, passConfirmVal } = this.state

		if( isEmpty(loginVal) ){
			isLoginInvalid = true
			validationMsgLogin = getRequiredWarning(LOGIN_FIELD_NAME)
		} else if( loginVal.length <= MIN_LENGTH ){
			const warning = getLengthWarning(MIN_LENGTH, LOGIN_FIELD_NAME)
			isLoginInvalid = true
			validationMsgLogin = warning
		} else {
			isLoginInvalid = false
			validationMsgLogin = ''
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

		if( isEmpty(passVal) ){
			isPassInvalid = true
			validationMsgPass = getRequiredWarning(PASSWORD_FIELD_NAME)
		} else if( passVal.length <= MIN_LENGTH ){
			const warning = getLengthWarning(MIN_LENGTH, PASSWORD_FIELD_NAME)
			isPassInvalid = true
			validationMsgPass = warning
		} else if(passVal !== passConfirmVal){
			isPassInvalid = true
			validationMsgPass = PASS_EQUAL
		} else {
			isPassInvalid = false
		}

		if( isEmpty(passConfirmVal) ){
			isConfirmPassInvalid = true
			validationMsgPassConfirm = getRequiredWarning(PASSWORD_FIELD_NAME)
		} else if( passConfirmVal.length <= MIN_LENGTH ){
			const warning = getLengthWarning(MIN_LENGTH, PASSWORD_FIELD_NAME)
			isConfirmPassInvalid = true
			validationMsgPassConfirm = warning
		} else if(passVal !== passConfirmVal){
			isConfirmPassInvalid = true
			validationMsgPassConfirm = PASS_EQUAL
		} else {
			isConfirmPassInvalid = false
		}

		this.setState((/*prevState, props*/) => ({
			isLoginInvalid,
			isEmailInvalid,
			isPassInvalid,
			isConfirmPassInvalid,

			validationMsgLogin,
			validationMsgEmail,

			validationMsgPass,
			validationMsgPassConfirm
		}))

		if(!isLoginInvalid && !isEmailInvalid && !isPassInvalid && !isConfirmPassInvalid){
			const userData = {
				login: loginVal,
				email: emailVal,
				password: passVal
			}

			this.props.dispatch(
				actions.sendUserRegistrationData(userData)
			)
		}
	}

	clearLoginField(){
		this.clearInvalidField('isLoginInvalid')
	}

	clearEmailField(){
		this.clearInvalidField('isEmailInvalid')
	}

	clearAllValidatedFields(){
		this.clearLoginField()
		this.clearEmailField()

		this.clearInvalidField('isPassInvalid')
		this.clearInvalidField('isConfirmPassInvalid')
	}

	clearAndValidate(ev){
		if(this.props.isRequestEnable){
			return
		}

		this.clearAllValidatedFields()
		this.validateAndReg(ev)
	}

	render(){
		return (
			<Form
				onSubmit={this.clearAndValidateBind}
			>
				<Form.Field>
					<label>Login</label>
					<ValidationInput
						type='text'
						isInvalid={this.state.isLoginInvalid}
						validationMsg={this.state.validationMsgLogin}
						placeholder='Enter your login'
						onChangeWrapper={this.setValueToLoginCall}
						onFocus={this.clearLoginBind}
					/>
				</Form.Field>
				<Form.Field>
					<label>Email</label>
					<ValidationInput
						type='text'
						isInvalid={this.state.isEmailInvalid}
						validationMsg={this.state.validationMsgEmail}
						placeholder={ENTER_YOUR_EMAIL}
						onChangeWrapper={this.setValueToEmailCall}
						onFocus={this.clearEmailFieldBind}
					/>
				</Form.Field>
				<Form.Field>
					<label>Password</label>
					<ValidationInput
						type='password'
						isInvalid={this.state.isPassInvalid}
						validationMsg={this.state.validationMsgPass}
						placeholder={ENTER_YOUR_PASSWORD}
						onChangeWrapper={this.setValueToPassCall}
						onFocus={this.clearInvalidPassBind}
					/>
				</Form.Field>
				<Form.Field>
					<label>Repeat password</label>
					<ValidationInput
						type='password'
						isInvalid={this.state.isConfirmPassInvalid}
						validationMsg={this.state.validationMsgPassConfirm}
						placeholder={CONFIRM_PASS}
						onChangeWrapper={this.setValueToPassConfirmCall}
						onFocus={this.clearInvalidConfirmPassBind}
					/>
				</Form.Field>
				<Button type='submit'>Submit</Button>
			</Form>
		)
	}
}

RegForm.propTypes = propTypes
