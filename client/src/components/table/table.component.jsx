import React from 'react';
import PropTypes from 'prop-types';
import TableHeader from '../table-header/table-header.component';
import TableRow from '../table-row/table-row.component';
import { Link, useRouteMatch } from 'react-router-dom';
import { VariableSizeList as List } from 'react-window';
import { getWordCount } from '../../utils/utils';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized-auto-sizer';
import './table.styles.scss';

const Table = ({ title, items, top, left, bottom, isDarkTheme }) => {
	const TableLink = (items) => {
		return <Link to={`/projects/issue/:issueId`} component={TableRow} />;
	};

	const getItemSize = (index) => {
		let numOfWords = getWordCount(items[index].summary);
		if (numOfWords <= 10) {
			return 95;
		}

		return 115;
	};
	return (
		<div className="wrapper">
			<div style={{ height: '100%' }}>
				<TableHeader count={items.length} />

				<div className={isDarkTheme ? 'table-wrapper dark' : 'table-wrapper light'}>
					<div className="table" style={{ top: top, left: left, bottom: bottom }}>
						{title ? (
							<div className="table__title">
								<h4>{title}</h4>
							</div>
						) : (
							''
						)}
						{items.length > 0 ? (
							<AutoSizer>
								{({ width, height }) => (
									<List
										height={height}
										itemCount={items.length}
										itemSize={getItemSize}
										width={width}
										itemData={items}
										overscanCount={3}
									>
										{TableRow}
									</List>
								)}
							</AutoSizer>
						) : (
							<div style={{ color: 'white', padding: '1rem' }}>
								You don't any issues.Tap the add button to create some.
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

Table.propTypes = {
	title: PropTypes.string,
	items: PropTypes.arrayOf(PropTypes.object),
	left: PropTypes.string,
	top: PropTypes.string,
	bottom: PropTypes.string
};

const mapStateToProps = (state) => {
	return {
		isDarkTheme: state.user.isDarkTheme
	};
};

export default connect(mapStateToProps)(Table);
