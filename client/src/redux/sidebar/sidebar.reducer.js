import { sideBarActionTypes } from './sidebar.types';

const INITIAL_STATE = {
	toggleProjectsSubcategory: true,
	toggleToolsSubcategory: true
};

export const sidebarReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case sideBarActionTypes.TOGGLE_PROJECTS_SUBCATEGORY:
			return Object.assign({}, state, { toggleProjectsSubcategory: !state.toggleProjectsSubcategory });
		case sideBarActionTypes.TOGGLE_TOOLS_SUBCATEGORY:
			return Object.assign({}, state, { toggleToolsSubcategory: !state.toggleToolsSubcategory });
		default:
			return state;
	}
};
