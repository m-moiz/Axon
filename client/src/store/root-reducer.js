import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { issueReducer } from './issue/issue.reducer';
import { userReducer } from './user/user.reducer';
import { projectReducer } from './project/project.reducer';
import { sidebarReducer } from './sidebar/sidebar.reducer';
import { messageReducer } from './message/message.reducer';
import { commentReducer } from './comment/comment.reducer';
import { teamReducer } from './team/team.reducer';
import { userActionTypes } from './user/user.types';

const persistConfig = {
	key: 'root',
	storage: storage,
	stateReconciler: autoMergeLevel2,
	whitelist: [ 'user', 'project', 'team' ]
};

const appReducer = combineReducers({
	issue: issueReducer,
	user: userReducer,
	project: projectReducer,
	sidebar: sidebarReducer,
	message: messageReducer,
	comment: commentReducer,
	team: teamReducer
});

const rootReducer = (state, action) => {
	if (action.type === userActionTypes.SIGN_OUT) {
		localStorage.removeItem('persist:root');
		window.sessionStorage.removeItem('token');
		state = undefined;
	}

	return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
