import React from 'react'
import PropTypes from 'prop-types'
import { TransitionMotion, spring } from 'react-motion'

import { KEY } from '../../constants'

const propTypes = {
	children: PropTypes.element.isRequired,
	isOpen: PropTypes.bool.isRequired,
	openStyles: PropTypes.object.isRequired,
	closeStyles: PropTypes.object.isRequired
}

export default class SlideToggle extends React.Component {
	constructor(props) {
    super(props)

    this.state = {
      data: [],
			show: true
    }

		this.willEnterBind = this.willEnter.bind(this)
		this.willLeaveBind = this.willLeave.bind(this)
  }

	componentWillReceiveProps(nextProps){
		if (nextProps.isOpen === true) {
      this.setState({
				data: [
					{
						key: KEY,
						style: this.props.openStyles
					}
				],
      })
    } else {
      this.setState({
        data: [ ],
      })
    }
	}

	wrappSpring(styles){
		let wrappedStyles = {}

		for(let prop in styles){
			wrappedStyles[prop] = spring(styles[prop])
		}

		return wrappedStyles
	}

  willEnter() {
    return this.props.closeStyles
  }

  willLeave() {
		const wrappedCloseStyles = this.wrappSpring(this.props.closeStyles)
		return wrappedCloseStyles
  }

  render() {
    return (
      <TransitionMotion
        styles={this.state.data.map((item) => {
          const { style } = item
					const wrappedStyles = this.wrappSpring(style)
          return {
            key: item.key,
            style: wrappedStyles
          }
        })}
				willEnter={this.willEnterBind}
        willLeave={this.willLeaveBind}
      >
        {(items) => {
          if (items.length === 0) {
            return null
          }
          const { style } = items[0]
					const childrenWithStyles = React.Children.map(
						this.props.children,
						child => React.cloneElement(child, {
							style
						})
					)
					return (
						<div className='slide-toggle-wrapper'>
							{childrenWithStyles}
						</div>
					)
        }}
      </TransitionMotion>
    )
  }
}

SlideToggle.propTypes = propTypes
