import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

import HomePage from '../../components/HomePage'
import Notifier from '../../components/Notifier'
import Login from '../../components/Login'
import Confirmation from '../../components/Login/Confirmation'
import SuccessReg from '../../components/Login/SuccessReg'
import UserTags from '../../components/UserTags'
import NotFound from '../../components/NotFound'
import Header from '../../components/Header'
import Feedback from '../../components/Feedback'
import Searching from '../../components/Searching'
import Profile from '../../components/Profile'
import loggedToLooking from '../../HOC/redirectLoggedToLooking'

import userProfileTrans from '../../../translations/en/userProfile'

const propTypes = {
	dispatch: PropTypes.func.isRequired,

	confirming: PropTypes.object.isRequired,
	profileCurrentUser: PropTypes.object.isRequired,
	profileReview: PropTypes.object.isRequired,
	notifier: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	search: PropTypes.object.isRequired,
	feedback: PropTypes.object.isRequired
}

function App (props){
  const {
    confirming: { isItConfirmingProcess },

    dispatch,
    profileCurrentUser,
    profileReview,
		loginRegistrDetails,
    loginRegistrDetails: { isLogged },
    notifier: { isRequestEnable, message },
		search: { searchResults, isSearchBtnClicked, isSearchOfferToLooking },
		feedback: { willClearFeedback },
		history
  } = props

	const MainPageComp = (
		<UserTags
			dispatch={dispatch}
			isRequestEnable={isRequestEnable}
			tags={profileCurrentUser.tags}
			title={userProfileTrans.title}
			isEditable={false}
		/>
	)

	const loginComp = (
		<Login
			loginRegistrDetails={loginRegistrDetails}
			isRequestEnable={isRequestEnable}
			dispatch={dispatch}
		/>
	)

	const HomePageComp = <HomePage />
	const LoginToLooking = loggedToLooking(MainPageComp, loginComp)
	const AuthToLooking = loggedToLooking(MainPageComp, HomePageComp)

  return (
    <div className='main-wrapper'>
      <Notifier
        isRequestEnable={isRequestEnable}
        message={message}
      />
      <Header
        isLogged={isLogged}
        dispatch={dispatch}
				userName={profileCurrentUser.userName}
				currentUserId={profileCurrentUser.userId}
				login={profileCurrentUser.login}
      />

			{ isLogged
					&&
				<Feedback
					willClearFeedback={willClearFeedback}
					dispatch={dispatch}
					isRequestEnable={isRequestEnable}
				/>}

      <Switch>
        <Route
          exact
          path='/'
          // eslint-disable-next-line react/jsx-no-bind
          render={() => (
						// TODO: replace with landing explanation page
						AuthToLooking(isLogged)
					)}
        />
        <Route
          path='/login'
          // eslint-disable-next-line react/jsx-no-bind
          render={() => (
						LoginToLooking(isLogged)
					)}
        />
        {
          isItConfirmingProcess
          &&
          <Route
            path='/confirm/:hash'
            component={Confirmation}
          />
        }
        <Route
          path='/success-reg'
          component={SuccessReg}
        />
				<Route
					path='/auth/fb/callback'
					// eslint-disable-next-line react/jsx-no-bind
					render={() => ( <Redirect to='/main' /> )}
				/>
				<Route
					path='/main'
					// eslint-disable-next-line react/jsx-no-bind
					render={() => (
						<div>
							{MainPageComp}
							<Searching
								dispatch={dispatch}
								isRequestEnable={isRequestEnable}
								isSearchOfferToLooking={isSearchOfferToLooking}
								userTags={profileCurrentUser.tags}
								isSearchBtnClicked={isSearchBtnClicked}
								searchResults={searchResults}
								history={history}
							/>
						</div>
												)}
				/>
				<Route
					path='/profile/:id'
					// eslint-disable-next-line react/jsx-no-bind
					render={(props) => {
						const { match: { params: { id } } } = props

						if(parseInt(id) === profileCurrentUser.userId){
							return (
								<Profile
									profile={profileCurrentUser}
									currentUserId={profileCurrentUser.userId}
									dispatch={dispatch}
									isRequestEnable={isRequestEnable}
									isEditable
								/>
							)
						} else {
							return (
								<Profile
									profile={profileReview}
									currentUserId={profileCurrentUser.userId}
									dispatch={dispatch}
									isRequestEnable={isRequestEnable}
									isEditable={false}
								/>
							)
						}
					}
					}
				/>
        <Route component={NotFound} />
      </Switch>
    </div>
  )
}


function mapStateToProps(state){
	return state
}

function mapDispatchToProps(dispatch){
  return {
    dispatch
  }
}

export default withRouter(
	connect(
		// https://github.com/ReactTraining/react-router/issues/3536
		mapStateToProps, mapDispatchToProps, null, { pure: false }
	)(App)
)

App.propTypes = propTypes
