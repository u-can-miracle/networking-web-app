import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { TextArea, Button, Icon } from 'semantic-ui-react'

import * as actions from '../../actions'
import feedbackTranslation from '../../../translations/en/feedback'

const {
	feedbackTitle,
	sendFeedbackBtnText
} = feedbackTranslation

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	willClearFeedback: PropTypes.bool.isRequired,
	isRequestEnable: PropTypes.bool.isRequired
}

class Feedback extends React.PureComponent {
	constructor(props){
		super(props)

		this.state = {
			isOpenedMode: false,
			message: props.feedback
		}

		this.updateMessageBind = this.updateMessage.bind(this)
		this.enableOpenedModeBind = this.enableOpenedMode.bind(this)
		this.disableOpenedModeBind = this.disableOpenedMode.bind(this)
		this.sendFeedbackBind = this.sendFeedback.bind(this)
	}

	componentWillReceiveProps(nextProps){
		const { willClearFeedback } = nextProps

		if(willClearFeedback){
			this.setState(() => ({ message: '' }))
			this.props.dispatch(actions.clearFeedbackDisable())
		}
	}

	updateMessage(ev){
		const { value } = ev.target

		this.setState({
			message: value
		})
	}

	toggleOpenedMode(condition){
		const { isOpenedMode } = this.state

		if(isOpenedMode === condition){
			this.setState(prevState => ({
				isOpenedMode: !prevState.isOpenedMode
			}))
		}
	}

	enableOpenedMode(){
		this.toggleOpenedMode(false)
	}

	disableOpenedMode(){
		this.toggleOpenedMode(true)
	}

	sendFeedback(){
		const { dispatch, isRequestEnable } = this.props
		const { message } = this.state

		if(isRequestEnable) return

		dispatch(actions.sendFeedback(message))
	}

	render(){
		const { isOpenedMode, message } = this.state

		return (
			<div
				className={classnames(
					'feedback',
					{ 'feedback--openend': isOpenedMode }
				)}
				onClick={this.enableOpenedModeDind}
			>
				<div
					className='feedback--icons-block'
				>
					<span className='feedback--title-long'>{feedbackTitle}</span>
					<Icon name='window minimize' onClick={this.disableOpenedModeBind} />
					<Icon	name='window maximize'
						onClick={this.enableOpenedModeBind}
					/>
				</div>
				<TextArea
					className='feedback--form'
					rows={6}
					value={message}
					onChange={this.updateMessageBind}
				/>
				<Button
					compact
					onClick={this.sendFeedbackBind}
				>
					{sendFeedbackBtnText}
				</Button>
			</div>
		)
	}
}

Feedback.propTypes = propTypes

export default Feedback
