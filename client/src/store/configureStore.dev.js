import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from '../reducers'
import DevTools from '../containers/DevTools/DevTools'
import middlewares from '../middlewares'

const enhancer = compose(
  // Middleware you want to use in development
  applyMiddleware( ...middlewares ),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
)

export default function configureStore(initialState){
  // Note: only Redux >= 3.1.0 supports passing enhancer as 3th argument
  // See https://github.com/reactjs/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer)

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if(module.hot){
    module.hot.accept('../reducers', () => {
      /*.default for Babel 6+ */
      store.replaceReducer(require('../reducers').default)
    })
  }

  return store
}
