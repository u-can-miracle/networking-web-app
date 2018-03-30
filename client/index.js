import "babel-polyfill"; // eslint-disable-line
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import rootSaga from './src/sagas';
import sagaMiddleware from './src/middlewares/sagaMiddleware';
import reducers from './src/reducers';
import ProviderWrapper from './src/containers/Provider';
import getSingletoneStore from './src/store/getSingletoneStore';

sagaMiddleware.run(rootSaga);

const store = getSingletoneStore();


const render = (ProviderComponent) =>
  ReactDOM.render(
    <AppContainer>
      <ProviderComponent store={store} />
    </AppContainer>,
    document.getElementById('root')
  );


render(ProviderWrapper);



if (module.hot) {
  module.hot.accept('./src/reducers', () => {
    store.replaceReducer(reducers);
  });

  module.hot.accept('./src/containers/Provider', () => {
		const NextProvider = require('./src/containers/Provider').default;

		render(NextProvider);
  });
}

// if (process.env.NODE_ENV !== 'production') {
//   const showDevTools = require('./src/containers/DevTools').default;
//   showDevTools(store);
// }
