import React, { Component } from 'react';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import { selectIsSidebarOpen } from '../../store/sidebar/sidebar.selectors';
import { connect } from 'react-redux';

// Add or change user name, email
// Change team
interface ISettingsPage {
	isSidebarOpen: boolean;
}
const SettingsPage = ({ isSidebarOpen }: ISettingsPage) => {
	return (
		<PageContainer>
			<SharedSidebar showGoBack goBackTo="/projects" title="Settings" isSidebarOpen={isSidebarOpen} />
			<PageContentContainer>
				<div> Yo there</div>
			</PageContentContainer>
		</PageContainer>
	);
};

const mapStateToProps = (state) => {
	return {
		isSidebarOpen: selectIsSidebarOpen(state)
	};
};

export default connect(mapStateToProps)(SettingsPage);
