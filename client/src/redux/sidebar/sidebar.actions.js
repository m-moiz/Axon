import { sideBarActionTypes } from './sidebar.types';

export const toggleProjectsSubcategory = () => ({
	type: sideBarActionTypes.TOGGLE_PROJECTS_SUBCATEGORY
});

export const toggleToolsSubcategory = () => ({
	type: sideBarActionTypes.TOGGLE_TOOLS_SUBCATEGORY
});

export const toggleSidebarItemVisibility = (itemName) => ({
	type: sideBarActionTypes.TOGGLE_SIDEBAR_ITEM_VISIBILITY,
	payload: itemName
});

export const addSidebarItemVisibiliy = (itemName) => ({
	type: sideBarActionTypes.ADD_SIDEBAR_ITEM_VISIBILITY,
	payload: itemName
});
