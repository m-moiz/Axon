import { combineReducers } from 'redux';
import { issueReducer } from './issue/issue.reducer';
import { userReducer } from './user/user.reducer';

export default combineReducers({
	issue: issueReducer,
	user: userReducer
});
