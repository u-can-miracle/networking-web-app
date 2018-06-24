import React from 'react'
import { NavLink } from 'react-router-dom'

import homePageTranslation from '../../../translations/en/homePage'

const {
	findPeople,
	login,
	enterToProfile,
	addTags,
	toSearch,
	getSearchResult,
	start
} = homePageTranslation

export default function Comp(){
	return (
		<div className='home-page max-with-limit'>
			<h2 className='home-page--title'>
				{findPeople} - my awesome design (^_^)
			</h2>

			<div className='home-page--how-to-guide'>
				<div className='home-page--how-to-step'>
					1.
					&nbsp;
					<NavLink to='/login'>{login}</NavLink>
					&nbsp;
					{enterToProfile}
				</div>
				<div className='home-page--how-to-step'>
					2. {addTags}
					<div className='center-content'>
						<img src='/img/home-page/my-profile.png' />
						---->>
						<img
							src='/img/home-page/app-tags.png'
						/>
					</div>
				</div>
				<div className='home-page--how-to-step'>
					3. {toSearch}
					<div className='center-content'>
						<img src='/img/home-page/search.png' />
					</div>
				</div>
				<div className='home-page--how-to-step'>
					4. {getSearchResult}
					<div className='center-content'>
						<img
							className='home-page--img-width-limit'
							src='/img/home-page/matching.png'
						/>
						---->>
						<img
							className='home-page--img-width-limit'
							src='/img/home-page/search-result.png'
						/>
					</div>
				</div>
			</div>

			<div className='home-page--start'>
				<NavLink to='/login'>{login}</NavLink>
				&nbsp;
				{start}
			</div>
		</div>
	)
}
