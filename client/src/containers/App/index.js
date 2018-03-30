import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'


import Notifier from '../../components/Notifier'
import Login from '../../components/Login'
import Confirmation from '../../components/Login/Confirmation'
import SuccessReg from '../../components/Login/SuccessReg'
import UserProfile from '../../components/UserProfile'
import Auth from '../../components/Auth'
import NotFound from '../../components/NotFound'
import Header from '../../components/Header'
import Searching from '../../components/Searching'
import loggedToLooking from '../../HOC/redirectLoggedToLooking'

import userProfileTrans from '../../../translations/en/userProfile.json'

const propTypes = {
	dispatch: PropTypes.func.isRequired,

	confirming: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	notifier: PropTypes.object.isRequired,
	searchResults: PropTypes.array.isRequired
}

function App (props){
  const {
    confirming: { isItConfirmingProcess },

    dispatch,
    profile,
    profile: { isLogged },
    notifier: { isRequestEnable, message },
		searchResults
  } = props

	const MainPageComp = (
		<UserProfile
			dispatch={dispatch}
			isRequestEnable={isRequestEnable}
			isEditable
			tags={profile.tags}
			title={userProfileTrans.title}
		/>
	)

	const loginComp = (
		<Login
			profile={profile}
			isRequestEnable={isRequestEnable}
			dispatch={dispatch}
		/>
	)

	const authComp = <Auth />
	const LoginToLooking = loggedToLooking(MainPageComp, loginComp)
	const AuthToLooking = loggedToLooking(MainPageComp, authComp)

  return (
    <div className='main-wrapper'>
      <Notifier
        isRequestEnable={isRequestEnable}
        message={message}
      />
      <Header
        isLogged={isLogged}
        dispatch={dispatch}
				userName={profile.userName}
      />
      <Switch>
        <Route
          exact
          path='/'
          // eslint-disable-next-line react/jsx-no-bind
          render={() => (
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
					path='/main'
					// eslint-disable-next-line react/jsx-no-bind
					render={() => (
						<div>
							{MainPageComp}
							<Searching
								dispatch={dispatch}
								isRequestEnable={isRequestEnable}
								userTags={profile.tags}
								searchResults={searchResults}
							/>
						</div>
												)}
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

export default connect(
  // https://github.com/ReactTraining/react-router/issues/3536
  mapStateToProps, mapDispatchToProps, null, { pure:false }
)(App)

App.propTypes = propTypes
