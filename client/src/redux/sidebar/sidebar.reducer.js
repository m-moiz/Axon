import { sideBarActionTypes } from './sidebar.types';

const INITIAL_STATE = {
	toggleProjectsSubcategory: true,
	toggleToolsSubcategory: true,
	sidebarItems: {}
};

export const sidebarReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case sideBarActionTypes.ADD_SIDEBAR_ITEM_VISIBILITY:
			return Object.assign({}, state, {
				sidebarItems: { ...state.sidebarItems, [action.payload]: { hidden: false } }
			});
		case sideBarActionTypes.TOGGLE_SIDEBAR_ITEM_VISIBILITY:
			return {
				...state,
				sidebarItems: {
					...state.sidebarItems,
					[action.payload]: { hidden: !state.sidebarItems[action.payload].hidden }
				}
			};
		case sideBarActionTypes.TOGGLE_PROJECTS_SUBCATEGORY:
			return Object.assign({}, state, { toggleProjectsSubcategory: !state.toggleProjectsSubcategory });
		case sideBarActionTypes.TOGGLE_TOOLS_SUBCATEGORY:
			return Object.assign({}, state, { toggleToolsSubcategory: !state.toggleToolsSubcategory });
		default:
			return state;
	}
};
