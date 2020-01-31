import React from 'react';
import PropTypes from 'prop-types';
import Label from '../label/label.component';
import PriorityIcon from '../priority-icon/priority-icon.component';
import ToggleItem from '../toggle-item/toggle-item.component';
import moment from 'moment';
import './details-box.styles.scss';

function DetailsBox({
	isDetailsVisible,
	toggleDetails,
	type,
	label,
	reporter,
	priority,
	environment,
	resolution,
	version,
	dueDate,
	creationDate
}) {
	return (
		<React.Fragment>
			<ToggleItem isOpen={isDetailsVisible} handleClick={toggleDetails} title="Details" marginTop="1rem" />
			<div className="details-box">
				{isDetailsVisible && type && <span>Type: {type}</span>}
				{isDetailsVisible && reporter && <span>Reporter: {reporter}</span>}
				{isDetailsVisible &&
				label && (
					<span>
						Label:{' '}
						{
							<Label
								labelType={label}
								marginLeft=".4rem"
								fontSize=".7rem"
								boxShadow="none"
								position="relative"
								bottom=".1rem"
							/>
						}
					</span>
				)}
				{isDetailsVisible &&
				priority && (
					<span>
						Priority: <PriorityIcon priority={priority} />
					</span>
				)}
				{isDetailsVisible && environment && <span>Environment: {environment}</span>}
				{isDetailsVisible && resolution && <span>Resolution: {resolution}</span>}
				{isDetailsVisible && version && <span>Version: {version} </span>}
				{isDetailsVisible && dueDate && <span>Due Date: {moment(dueDate).format('DD-MM-YYYY')} </span>}
				{isDetailsVisible &&
				creationDate && <span>Creation Date: {moment(creationDate).format('DD-MM-YYYY')} </span>}
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
