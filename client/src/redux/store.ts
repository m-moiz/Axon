import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

const middlewares = [ logger, thunk ];

export default () => {
	const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
	const persistor = persistStore(store);
	return { store, persistor };
};
