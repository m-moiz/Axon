import React from 'react';
import './page-container.styles.scss';
import Modal from '../../components/modal/modal.components';
import WorkOverlay from '../../components/work-overlay/work-overlay.component';
import { connect } from 'react-redux';

class PageContainer extends React.Component {
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
