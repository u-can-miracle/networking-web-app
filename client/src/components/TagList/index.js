import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'semantic-ui-react'
import classnames from 'classnames'

import { LOOKING, OFFER } from '../../constants'
import Tag from './Tag'
import TagForm from './TagForm'

const propTypes = {
	dispatch: PropTypes.func.isRequired,
	title: PropTypes.string,
	className: PropTypes.string,
	isRequestEnable: PropTypes.bool.isRequired,
	isEditable: PropTypes.bool.isRequired,
	tagList: PropTypes.arrayOf(PropTypes.shape({
		tagId: PropTypes.number.isRequired,
		userTagId: PropTypes.number.isRequired,
		tagName: PropTypes.string.isRequired
	})).isRequired,
	tagType: PropTypes.string.isRequired,
	tags: PropTypes.shape({
		[OFFER]: PropTypes.array.isRequired,
		[LOOKING]: PropTypes.array.isRequired
	}).isRequired
}

function TagList({
	dispatch, title, className, tagList, tagType, isEditable, isRequestEnable, tags
}){

	function renderTagList(){
		return tagList.map(tag => (
				<Tag
					key={tag.tagId}
					tag={tag}
					tagType={tagType}
					isEditable={isEditable}
					isRequestEnable={isRequestEnable}
					dispatch={dispatch}
					tags={tags}
				/>
			)
		)
	}

	return (
		<div className={classnames(className)}>
			{
				title &&
				<Header as='h4'
					className='tag-list--title'
					content={title}
				/>
			}

			{
				isEditable
				&&
				<TagForm
					dispatch={dispatch}
					tagList={tagList}
					tagType={tagType}
					tags={tags}
				/>
			}

			{renderTagList()}
		</div>
	)
}

TagList.propTypes = propTypes

export default TagList
