import React from 'react';
import PropTypes from 'prop-types';
import Label from '../label/label.component';
import PriorityIcon from '../priority-icon/priority-icon.component';
import ToggleItem from '../toggle-item/toggle-item.component';
import moment from 'moment';
import { animated } from 'react-spring';
import { Transition } from 'react-spring/renderprops';
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
			<Transition
				items={isDetailsVisible}
				from={{ opacity: 0 }}
				enter={{ opacity: 1 }}
				leave={{ opacity: 0 }}
				config={{ duration: 100 }}
			>
				{(show) =>
					show &&
					((props) => (
						<animated.div style={props} className="details-box">
							{type && <span>Type: {type}</span>}
							{reporter && <span>Reporter: {reporter}</span>}
							{label && (
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
							{priority && (
								<span>
									Priority: <PriorityIcon priority={priority} />
								</span>
							)}
							{environment && <span>Environment: {environment}</span>}
							{resolution && <span>Resolution: {resolution}</span>}
							{version && <span>Version: {version} </span>}
							{dueDate && <span>Due Date: {moment(dueDate).format('DD-MM-YYYY')} </span>}
							{creationDate && <span>Creation Date: {moment(creationDate).format('DD-MM-YYYY')} </span>}
						</animated.div>
					))}
			</Transition>
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
