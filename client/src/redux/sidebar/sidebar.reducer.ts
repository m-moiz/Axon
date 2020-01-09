import { sideBarActionTypes } from './sidebar.types';

const INITIAL_STATE = {
	isSidebarOpen: true,
	isSidebarClosing: false,
	isSidebarOpening: false,
	toggleProjectsSubcategory: true,
	toggleToolsSubcategory: true,
	sidebarItems: {}
};

export const sidebarReducer = (state = INITIAL_STATE, action = {}) => {
	switch (action.type) {
		case sideBarActionTypes.TOGGLE_SIDEBAR:
			return Object.assign({}, state, { isSidebarOpen: !state.isSidebarOpen });
		case sideBarActionTypes.TOGGLE_SIDEBAR_IS_CLOSING:
			return Object.assign({}, state, { isSidebarClosing: !state.isSidebarClosing });
		case sideBarActionTypes.TOGGLE_SIDEBAR_IS_OPENING:
			return Object.assign({}, state, { isSidebarOpening: !state.isSidebarOpening });
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
