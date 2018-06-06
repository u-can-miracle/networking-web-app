import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const propTypes = {
	children: PropTypes.element,
	title: PropTypes.string,
	value: PropTypes.string,
	isEditable: PropTypes.bool.isRequired,
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
			value: props.value,
			isLoaded: false
		}

		this.updateWidthBind = this.updateWidth.bind(this)
		this.submitBind = this.submit.bind(this)
		this.updateValueBind = this.updateValue.bind(this)
	}

	componentDidMount(){
		this.updateWidth()
		this.setState(() => ({
			isLoaded: true
		}))
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
		const { isEditedModeEnable, width, isLoaded, value } = this.state
		const { className, placeholder, title, isEditable } = this.props

		return (
			<div
				className={classnames(
					className,
					'editable',
					{ 'editable--enable': isEditable && isEditedModeEnable },
					{ 'editable--loaded': isEditable && isLoaded }
				)}
			>
				{
					title
						&&
					<div
						className='editable--title'
					>
						{title}:
					</div>
				}
				<div className='editable--content'>
					<span
						className='editable--text-block'
						// eslint-disable-next-line react/jsx-no-bind
						ref={span => { this.spanRef = span	}}
					>
						{value || placeholder}
					</span>

					{
						isEditable
							&&
						<input
							className='editable--input-block'
							style={{ width: width + 5 }}
							placeholder={placeholder}
							value={value}
							onBlur={this.submitBind}
							onChange={this.updateValueBind}
						/>
					}
				</div>
			</div>
		)
	}
}


EditedInput.propTypes = propTypes


export default EditedInput
