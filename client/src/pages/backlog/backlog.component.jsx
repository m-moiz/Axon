import React from 'react';
import SharedSidebar from '../../components/sidebar-shared/shared-sidebar.component';
import { selectIsSidebarOpen } from '../../redux/sidebar/sidebar.selectors';
import { connect } from 'react-redux';
import Table from '../../components/table/table.component';

const BacklogPage = ({ isSidebarOpen }) => (
	<React.Fragment>
		<SharedSidebar
			title="Backlog"
			addToolTipText="Create Issue"
			editToolTipText="Edit Issue"
			deleteToolTipText="Delete Issues"
			isSidebarOpen={isSidebarOpen}
		/>

		<Table title="Backlog" />
	</React.Fragment>
);

const mapStateToProps = (state) => {
	return {
		isSidebarOpen: selectIsSidebarOpen(state)
	};
};

export default connect(mapStateToProps)(BacklogPage);
