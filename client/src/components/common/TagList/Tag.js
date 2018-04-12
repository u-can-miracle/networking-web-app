import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Label } from 'semantic-ui-react'
import classnames from 'classnames'

import { LOOKING, OFFER } from '../../../constants'
import { removeTagRequest } from '../../../actions'
import { getTagsNamesList } from '../../../services/helpers'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	isRequestEnable: PropTypes.bool.isRequired,
	tagType: PropTypes.string.isRequired,
	isEditable: PropTypes.bool.isRequired,
	tag: PropTypes.shape({
		tagId: PropTypes.number.isRequired,
		userTagId: PropTypes.number.isRequired,
		tagName: PropTypes.string.isRequired
  }).isRequired,
	tags: PropTypes.shape({
		[OFFER]: PropTypes.array.isRequired,
		[LOOKING]: PropTypes.array.isRequired
	}).isRequired
}

function Tag({ tag, isRequestEnable, tagType, dispatch, isEditable, tags }){
	function removeTag(){
		if(isRequestEnable) {
			return
		}

		const updatedTags = {
			...tags,
			[tagType]: tags[tagType].filter(
				curTag => curTag.tagId !== tag.tagId
			)
		}
		const tagsWithNames = {
			[OFFER]: getTagsNamesList(updatedTags[OFFER]),
			[LOOKING]: getTagsNamesList(updatedTags[LOOKING])
		}
		dispatch(removeTagRequest(tag.userTagId, tagType, tagsWithNames))
	}

	return (
		<Label as='a'>
			{tag.tagName}
			{
				isEditable
				&&
				<Icon
					className={classnames({ 'tag__disabled': isRequestEnable })}
					name='delete'
					onClick={removeTag}
				/>
			}

		</Label>
	)
}

Tag.propTypes = propTypes

export default Tag
