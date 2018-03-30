import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Label } from 'semantic-ui-react'

import SlideToggle from '../SlideToggle'

const propTypes = {
	type: PropTypes.string,
	placeholder: PropTypes.string,
	validationMsg: PropTypes.string.isRequired,
	isInvalid: PropTypes.bool.isRequired,
	onChangeWrapper: PropTypes.func.isRequired,
	onFocus: PropTypes.func
}

export default class ValidationInput extends Component {
	constructor(props){
		super(props)

		this.preventBackSpaceBind = this.preventBackSpace.bind(this)
	}

	preventBackSpace(e){
		if(e.which === 32){
			e.preventDefault()
		}
	}

	render(){
		const {
			type,
			placeholder,
			isInvalid,
			onChangeWrapper,
			onFocus,
			validationMsg
		} = this.props

		const openStyles = {
			opacity: 1,
			left: -10
		}
		const closeStyles = {  // destinational styles
			opacity: 0,
			left: 2
		}

		return (
			<div>
				<Input
					type={type}
					placeholder={placeholder}
					error={isInvalid}
					onChange={onChangeWrapper}
					onFocus={onFocus}
					onKeyPress={this.preventBackSpaceBind}
				/>
				<SlideToggle
					isOpen={isInvalid}
					openStyles={openStyles}
					closeStyles={closeStyles}
				>
						<div className='label-wrapper'>
							<Label
								basic
								color='red'
								pointing='right'
							>
								{validationMsg}
							</Label>
						</div>
				</SlideToggle>
			</div>
		)
	}
}


ValidationInput.propTypes = propTypes
