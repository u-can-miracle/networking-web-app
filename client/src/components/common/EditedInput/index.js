import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
	children: PropTypes.element,
	title: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	onBlur: PropTypes.func
}

class EditedInput extends Component {
	constructor(props){
		super(props)

		this.spanRef = null

		this.state = {
			isEditedModeEnable: false,
			width: 0,
			value: props.value
		}

		this.updateWidthBind = this.updateWidth.bind(this)
		this.submitBind = this.submit.bind(this)
		this.updateValueBind = this.updateValue.bind(this)
	}

	componentDidMount(){
		this.updateWidth()
	}

	updateWidth(){
		const width = this.spanRef.clientWidth
		this.setState({
			width: width
		})
	}

	toggleEditMode(){
		this.setState(prevState => ({
			isEditedModeEnable: !prevState.isEditedModeEnable
		}))
	}

	updateValue(ev){
		const value = ev.target.value.replace(/\s\s/,' ')

		this.setState(( /* prevProps */ ) => ({
			value: value
		}), function(){
			this.updateWidth()
		})
	}

	submit(){
		const { value } = this.state

		this.toggleEditMode()
		this.props.onBlur && (value !== this.props.value) && this.props.onBlur(value)
	}

	render(){
		const { isEditedModeEnable, width, value } = this.state
		const { children, className, placeholder, title } = this.props

		return (
			<div
				className={classnames(
					className,
					'editable',
					{ 'editable--enable': isEditedModeEnable }
				)}
			>
				{
					title
						&&
					<h5
						className='editable--title'
					>
						{title}
						{children}
					</h5>
				}
				<div className='editable--content'>
					<span
						className='editable--text-block'
						// eslint-disable-next-line react/jsx-no-bind
						ref={span => { this.spanRef = span	}}
					>
						{value || placeholder}
					</span>

					<input
						className='editable--input-block'
						style={{ width: width + 5 }}
						placeholder={placeholder}
						value={value}
						onBlur={this.submitBind}
						onChange={this.updateValueBind}
					/>
				</div>
			</div>
		)
	}
}


EditedInput.propTypes = propTypes


export default EditedInput
