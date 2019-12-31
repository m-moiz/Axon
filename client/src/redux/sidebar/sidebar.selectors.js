import { createSelector } from 'reselect';

const selectSidebar = (state) => state.sidebar;

export const selectIsSidebarOpen = createSelector([ selectSidebar ], (sidebar) => sidebar.isSidebarOpen);
export const selectIsSidebarOpening = createSelector([ selectSidebar ], (sidebar) => sidebar.isSidebarOpening);
export const selectIsSidebarClosing = createSelector([ selectSidebar ], (sidebar) => sidebar.isSidebarClosing);

export const selectToggleToolsSubcategory = createSelector(
	[ selectSidebar ],
	(sidebar) => sidebar.toggleToolsSubcategory
);
export const selectToggleProjectsSubcategory = createSelector(
	[ selectSidebar ],
	(sidebar) => sidebar.toggleProjectsSubcategory
);

export const selectSidebarItems = createSelector([ selectSidebar ], (sidebar) => sidebar.sidebarItems);

export const selectSidebarItemHiddenProperty = (itemName) =>
	createSelector([ selectSidebarItems ], (sidebarItems) => sidebarItems[itemName].hidden);
