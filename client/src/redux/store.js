import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

const middlewares = [ thunk ];

if (process.env.NODE_ENV === 'development') {
	const createLogger = require('redux-logger').createLogger;
	const logger = createLogger();
	middlewares.push(logger);
}

export default () => {
	const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
	const persistor = persistStore(store);
	return { store, persistor };
};
