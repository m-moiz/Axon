import { projectActionTypes } from '../project/project.types';
import { setProjectId } from '../project/project.actions';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([ thunk ]);

describe('project actions', () => {
	it('should set project id', () => {
		const store = mockStore({ projectId: '', project: { projects: [ { name: 'Axee', _id: '123' } ] } });
		const projectName = 'Axee';

		const expectedAction = {
			type: projectActionTypes.SET_PROJECT_ID,
			payload: 'Axee'
		};

		store.dispatch(setProjectId());
		const actions = store.getActions();

		expect(actions).toEqual(expectedAction);
	});
});
