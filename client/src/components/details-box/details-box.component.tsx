import React from 'react';
import Label from '../label/label.component';
import PriorityIcon from '../priority-icon/priority-icon.component';
import ToggleItem from '../toggle-item/toggle-item.component';
import dayjs from 'dayjs';
import { animated } from 'react-spring';
import { Transition } from 'react-spring/renderprops';
import { connect } from 'react-redux';
import './details-box.styles.scss';

interface IDetailsBox {
	isDetailsVisible: Boolean;
	toggleDetails: React.MouseEvent;
	type?: string;
	label?: string;
	reporter?: string;
	priority?: string;
	environment?: string;
	resolution?: string;
	version?: string;
	dueDate?: string;
	creationDate?: string;
	isDarkTheme?: Boolean;
}

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
	creationDate,
	isDarkTheme
}: IDetailsBox) {
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
						<animated.div style={props} className={isDarkTheme ? 'details-box dark' : 'details-box light'}>
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
							{environment && (
								<span>
									Environment: <span className="issue-details">{environment}</span>
								</span>
							)}
							{resolution && (
								<span>
									Resolution: <span className="issue-details">{resolution}</span>
								</span>
							)}
							{version && (
								<span>
									Version: <span className="issue-details">{version}</span>{' '}
								</span>
							)}
							{dueDate && (
								<span>
									Due Date:{' '}
									<span className="issue-details">{dayjs(dueDate).format('d MMM YYYY')}</span>{' '}
								</span>
							)}
							{creationDate && (
								<span>
									Creation Date:{' '}
									<span className="issue-details">
										{dayjs(creationDate).format('d MMM YYYY')}
									</span>{' '}
								</span>
							)}
						</animated.div>
					))}
			</Transition>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};
export default connect(mapStateToProps)(DetailsBox);
