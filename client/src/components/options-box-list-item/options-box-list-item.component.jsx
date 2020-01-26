import React from 'react';
import PropTypes from 'prop-types';
import './options-box-list-item.styles.scss';
import {
	setSortType,
	setLabelFilter,
	setStatusFilter,
	toggleSortOptionsBox,
	toggleLabelOptionsBox,
	toggleStatusOptionsBox,
	toggleLabelOptionsBoxItem,
	toggleSortOptionsBoxItem,
	toggleStatusOptionsBoxItem
} from '../../redux/issue/issue.actions';
import { selectLabelFilter, selectStatusFilter, selectSortType } from '../../redux/issue/issue.selectors';
import { connect } from 'react-redux';

function OptionsBoxListItem({
	isActive = false,
	type,
	item,
	setLabelFilter,
	setSortType,
	setStatusFilter,
	labelFilter,
	statusFilter,
	sortType,
	toggleLabelOptionsBox,
	toggleSortOptionsBox,
	toggleStatusOptionsBox
}) {
	const handleClick = () => {
		console.log('Type: ' + type, 'Item: ' + item);
		if (type === 'label') {
			if (labelFilter === item) {
				setLabelFilter('');
				setStatusFilter('');
				toggleLabelOptionsBoxItem();
				toggleLabelOptionsBox();
			} else {
				setLabelFilter(item);
				toggleLabelOptionsBoxItem();
				toggleLabelOptionsBox();
			}
		} else if (type === 'status') {
			if (statusFilter === item) {
				setStatusFilter('');
				toggleStatusOptionsBoxItem();
				toggleStatusOptionsBox();
			} else {
				setStatusFilter(item);
				toggleStatusOptionsBoxItem();
				toggleStatusOptionsBox();
			}
		} else if (type === 'sort') {
			if (sortType === item) {
				setSortType('');
				toggleSortOptionsBoxItem();
				toggleSortOptionsBox();
			} else {
				console.log('hello');
				setSortType(item);
				toggleSortOptionsBoxItem();
				toggleSortOptionsBox();
			}
		}
	};

	return (
		<button onClick={handleClick} className={isActive ? 'optionsBoxListItem active' : 'optionsBoxListItem'}>
			<i
				className="fas fa-check"
				style={{
					marginRight: '.4rem',
					marginTop: '.35rem'
				}}
			/>
			<p>{item}</p>
		</button>
	);
}

OptionsBoxListItem.propTypes = {
	isActive: PropTypes.bool,
	item: PropTypes.string.isRequired
};

OptionsBoxListItem.defaultProps = {
	isActive: false
};

const mapStateToProps = (state) => {
	return {
		labelFilter: selectLabelFilter(state),
		statusFilter: selectStatusFilter(state),
		sortType: selectSortType(state)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setSortType: (sortType) => dispatch(setSortType(sortType)),
		setLabelFilter: (label) => dispatch(setLabelFilter(label)),
		setStatusFilter: (status) => dispatch(setStatusFilter(status)),
		toggleLabelOptionsBox: () => dispatch(toggleLabelOptionsBox()),
		toggleStatusOptionsBox: () => dispatch(toggleStatusOptionsBox()),
		toggleSortOptionsBox: () => dispatch(toggleSortOptionsBox()),
		toggleLabelOptionsBoxItem: () => dispatch(toggleLabelOptionsBoxItem()),
		toggleSortOptionsBoxItem: () => dispatch(toggleSortOptionsBoxItem()),
		toggleStatusOptionsBoxItem: () => dispatch(toggleStatusOptionsBoxItem())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsBoxListItem);
