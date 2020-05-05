import React from 'react';
import './page-container.styles.scss';
import Modal from '../modal/modal.components';
import WorkOverlay from '../work-overlay/work-overlay.component';
import { connect } from 'react-redux';

interface IPageContainerProps {
	isDarkTheme?: Boolean;
}

interface IPageContainerState {
	isWorkingOnOverlayOpen: Boolean;
}

class PageContainer extends React.Component<IPageContainerProps, IPageContainerState> {
	constructor(props) {
		super(props);
		this.state = {
			isWorkingOnOverlayOpen: false
		};
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 27) {
			this.setState({ isWorkingOnOverlayOpen: !this.state.isWorkingOnOverlayOpen });
		}
	};

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown);
	}

	render() {
		return (
			<React.Fragment>
				{this.state.isWorkingOnOverlayOpen && (
					<Modal>
						<WorkOverlay task="Create notifications feature" />
					</Modal>
				)}
				<div className={this.props.isDarkTheme ? 'page-container dark' : 'page-container light'}>
					{this.props.children}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

export default connect(mapStateToProps)(PageContainer);
