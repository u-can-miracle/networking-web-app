import React from 'react'
import { Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {
	delayedNotifier,
	addTagRequest
} from '../../../actions'
import { THIS_TAG_ALREADY_EXIST } from '../../../constants'
import { LOOKING, OFFER } from '../../../constants'
import { getTagsNamesList } from '../../../services/utils'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	tagList: PropTypes.arrayOf(PropTypes.shape({
		tagId: PropTypes.number.isRequired,
		tagName: PropTypes.string.isRequired
	})).isRequired,
	tagType: PropTypes.string.isRequired,
	tags: PropTypes.shape({
		[OFFER]: PropTypes.array.isRequired,
		[LOOKING]: PropTypes.array.isRequired
	}).isRequired
}

class TagForm extends React.PureComponent {
	constructor(props){
		super(props)

		this.state = {
			tagToAdd: ''
		}

		this.addNewTagBind = this.addNewTag.bind(this)
		this.updateTagToAddBind = this.updateTagToAdd.bind(this)
	}

	updateTagToAdd(ev){
		const { value } = ev.target

		this.setState((/*prevState, props*/) => ({
			tagToAdd: value
		}))
	}

	addNewTag(){
		const { tagToAdd } = this.state
		const { dispatch, tagType, tagList, tags } = this.props

		if(!tagToAdd.length){
			return
		}

		const isTagExist = tagList.find(tag => tag.tagName === tagToAdd)

		if(isTagExist){
			dispatch(delayedNotifier(THIS_TAG_ALREADY_EXIST))
			return
		}

		const updatedTags = {
			...tags,
			[tagType]: tags[tagType].concat({ tagName: tagToAdd })
		}
		const tagsWithNames = {
			[OFFER]: getTagsNamesList(updatedTags[OFFER]),
			[LOOKING]: getTagsNamesList(updatedTags[LOOKING])
		}

		dispatch(addTagRequest(tagToAdd, tagType, tagsWithNames))

		this.setState({
			tagToAdd: ''
		})
	}

  render() {
    return (
			<Form className='input__wide'
				onSubmit={this.addNewTagBind}
			>
				<Form.Group>
					<Form.Input
						placeholder='Teach english'
						value={this.state.tagToAdd}
						onChange={this.updateTagToAddBind}
					/>
					<Form.Button content='Add skill' />
				</Form.Group>
			</Form>
		)
  }
}

TagForm.propTypes = propTypes

export default TagForm
