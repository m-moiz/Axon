import React from 'react';
import PropTypes from 'prop-types';
import Label from '../label/label.component';
import PriorityIcon from '../priority-icon/priority-icon.component';
import ToggleItem from '../toggle-item/toggle-item.component';
import moment from 'moment';
import './details-box.styles.scss';

function DetailsBox({ type, label, reporter, priority, environment, resolution, version, dueDate, creationDate }) {
	return (
		<React.Fragment>
			<ToggleItem title="Details" marginTop="1rem" />
			<div className="details-box">
				<span>Type: {type}</span>
				<span>Reporter: {reporter}</span>
				<span>Label: {<Label labelType={label} marginLeft="1rem" />}</span>
				<span>
					Priority: <PriorityIcon priority={priority} />
				</span>
				<span>Environment: {environment}</span>
				<span>Resolution: {resolution}</span>
				<span>Version: {version} </span>
				<span>Due Date: {moment(dueDate).format('DD-MM-YYYY')} </span>
				<span>Creation Date: {moment(creationDate).format('DD-MM-YYYY')} </span>
			</div>
		</React.Fragment>
	);
}

DetailsBox.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string,
	reporter: PropTypes.string,
	priority: PropTypes.string,
	environment: PropTypes.string,
	resolution: PropTypes.string,
	version: PropTypes.string,
	creationDate: PropTypes.string,
	dueDate: PropTypes.string
};

export default DetailsBox;
