import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon } from 'semantic-ui-react'

import profileTranslation from '../../../../translations/en/profile'
import uploadTranslation from '../../../../translations/en/upload'

const kBites = 100

const defaultProps = {
	defaultImg: '',
	allowedFileTypes: [ 'jpg', 'jpeg', 'png' ],
	allowedFileSize: kBites * 1024 // 100 kilobites
}

const propTypes = {
	placeholderText: PropTypes.string.isRequired,
	defaultImg: PropTypes.string,
	className: PropTypes.string,
	imageSuccessHandler: PropTypes.func.isRequired,
	imageErrorHandler: PropTypes.func.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	removeHandler: PropTypes.func,
	isUploadEnable: PropTypes.bool.isRequired,
	allowedFileTypes: PropTypes.arrayOf(PropTypes.string),
	allowedFileSize: PropTypes.number
}

class FileUploader extends Component {
	constructor(props){
		super(props)

		this.photoInputRef = null

		this.state = {
			isDragEnable: false,
			// base64Img: props.defaultImg
		}

		this.onDragEnterBind = this.onDragEnter.bind(this)
		this.onDragLeaveBind = this.onDragLeave.bind(this)
		this.onLoadImgBind = this.onLoadImg.bind(this)
		this.removePhotoHandlerBind = this.removePhotoHandler.bind(this)
	}

	onDragEnter(){
		if(!this.props.isUploadEnable){
			return
		}

		this.setState(() => ({
			isDragEnable: true
		}))
	}

	onDragLeave(){
		if(!this.props.isUploadEnable){
			return
		}

		this.setState(() => ({
			isDragEnable: false
		}))
	}

	resetPhotoInputValue(){
		this.photoInputRef.value = ''
	}

	onLoadImg(ev){
		this.setState(() => ({
			isDragEnable: false
		}))

		const {
			imageSuccessHandler,
			imageErrorHandler,
			allowedFileTypes,
			allowedFileSize
		} = this.props
		const { files } = ev.target
		const {
			uploadErrorMsg,
			toLargeFileSize,
			kb
		} = uploadTranslation

		if(!files.length){
			return
		}
		if(!this.props.isUploadEnable){
			this.resetPhotoInputValue()
			return
		}

		const file = files[0]  // name, size
		const fileExtention = getFileExtention(file.name)

		if(!allowedFileTypes.includes(fileExtention)){
			const typeNitification = getExtentionNotification(fileExtention)
			imageErrorHandler(typeNitification)
			this.resetPhotoInputValue()
			return
		}

		if(file.size > allowedFileSize){
			imageErrorHandler(`${toLargeFileSize} ${kBites} ${kb}`)
			this.resetPhotoInputValue()
			return
		}

		const reader = new FileReader()

		reader.readAsDataURL(file)

		reader.onloadend = () => {
			const base64Result = reader.result

			imageSuccessHandler(base64Result)
		}

		reader.onerror = error => {
			// TODO: add logging to error
			console.log('error', error)
			imageErrorHandler(uploadErrorMsg)
		}


		function getFileExtention(fileName){
			return /[^.]+$/.exec(fileName)[0]
		}

		function getExtentionNotification(fileExtention){
			const { notAllowedTypes } = uploadTranslation
			const msgWithFileTypes = allowedFileTypes.reduce((accumValue, currentValue) => {
				return `${accumValue} ${currentValue}`
			}, notAllowedTypes)

			return `'${fileExtention}' ${msgWithFileTypes}`
		}
	}

	removePhotoHandler(){
		const {
			imageErrorHandler,
			removeHandler
		} = this.props
		const {
			removeErrorMsg
		} = uploadTranslation

		try {
			removeHandler()
			this.resetPhotoInputValue()
		} catch (err) {
			// TODO: add logging to error
			imageErrorHandler(removeErrorMsg)
		}
	}

	render(){
		const {
			className,
			width,
			height,
			placeholderText,
			defaultImg
		} = this.props
		const { isDragEnable } = this.state
		const { desription: { imgLoadNotice } } = profileTranslation

		return (
			<form
				encType='multipart/form-data'
				className={classnames(
					className,
					'file-uploader'
				)}
			>
				{
					defaultImg
						&&
					<Icon
						onClick={this.removePhotoHandlerBind}
						className='file-uploader-remove-btn'
						circular
						name='close'
					/>
				}
				<label
					style={{
						width,
						height
					}}
					htmlFor='file'
					className={classnames(
						'file-uploader--image-placeholder',
						{ 'file-uploader--enabled': isDragEnable }
					)}
				>
					<div
						className='file-uploader--placeholder'
					>
						<div
							className='file-uploader--placeholder-text'
						>
							{placeholderText}
						</div>
						<div>{height}x{width}</div>
					</div>
					{
						defaultImg
							&&
						<img
							src={defaultImg}
							className='file-uploader--loaded-img'
						/>
					}
					<input
						onDragEnter={this.onDragEnterBind}
						onDragLeave={this.onDragLeaveBind}
						// eslint-disable-next-line react/jsx-no-bind
						ref={(input) => { this.photoInputRef = input	}}
						onChange={this.onLoadImgBind}
						name='file'
						type='file'
						className='file-uploader--input'
					/>
				</label>
				<div
					className='file-uploader--img-load-notice'
				>
					{imgLoadNotice}
				</div>
			</form>
		)
	}
}

FileUploader.defaultProps = defaultProps
FileUploader.propTypes = propTypes

export default FileUploader
