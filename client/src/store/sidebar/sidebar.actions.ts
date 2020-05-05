import { sideBarActionTypes } from './sidebar.types';
import { batch } from 'react-redux';

export const toggleSidebar = () => ({
	type: sideBarActionTypes.TOGGLE_SIDEBAR
});

export const toggleSidebarIsOpening = () => ({
	type: sideBarActionTypes.TOGGLE_SIDEBAR_IS_OPENING
});
export const toggleSidebarIsClosing = () => ({
	type: sideBarActionTypes.TOGGLE_SIDEBAR_IS_CLOSING
});

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

export const openSidebar = () => (dispatch) =>
	new Promise((resolve, reject) => {
		batch(() => {
			dispatch(toggleSidebar());
			dispatch(toggleSidebarIsOpening());
		});
		setTimeout(() => {
			dispatch(toggleSidebarIsOpening());
			resolve();
		}, 500);
	});

export function closeSidebar() {
	return (dispatch) => {
		dispatch(toggleSidebarIsClosing());
		setTimeout(() => {
			batch(() => {
				dispatch(toggleSidebarIsClosing());
				dispatch(toggleSidebar());
			});
		}, 500);
	};
}
