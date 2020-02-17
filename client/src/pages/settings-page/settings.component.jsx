import React, { Component } from 'react';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import PageContainer from '../../components/page-container/page-container.component';
import PageContentContainer from '../../components/page-content-container/page-content-container.component';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { connect } from 'react-redux';

// Add or change user name, email
// Change team
export class SettingsPage extends Component {
	render() {
		return (
			<PageContainer>
				<SharedSidebar
					showGoBack
					goBackTo="/projects"
					title="Settings"
					isSidebarOpen={this.props.isSidebarOpen}
				/>
				<PageContentContainer>
					<div> Yo there</div>
				</PageContentContainer>
			</PageContainer>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isSidebarOpen: selectIsSidebarOpen(state)
	};
};

export default connect(mapStateToProps)(SettingsPage);
