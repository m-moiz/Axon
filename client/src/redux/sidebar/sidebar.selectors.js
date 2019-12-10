import { createSelector } from 'reselect';

const selectSidebar = (state) => state.sidebar;

export const selectSidebarItems = createSelector([ selectSidebar ], (sidebar) => sidebar.sidebarItems);

export const selectSidebarItemHiddenProperty = (itemName) =>
	createSelector([ selectSidebarItems ], (sidebarItems) => sidebarItems[itemName].hidden);
