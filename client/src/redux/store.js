import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

const middlewares = [ thunk, DEBUG && logger ].filter(Boolean);

export default () => {
	const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));
	const persistor = persistStore(store);
	return { store, persistor };
};
