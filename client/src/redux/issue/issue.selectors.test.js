import { selectFilteredAndSortedIssues, selectLabelAndStatusFilteredIssues, select } from './issue.selectors';

var state = {};

beforeEach(() => {
	state = {
		issue: {
			statusFilter: 'Open',
			labelFilter: 'Improvement',
			sortType: 'Highest Priority',
			issues: [
				{ _id: 1, priorityType: 'Medium', issueType: 'Improvement', status: 'Open' },
				{ _id: 2, priorityType: 'High', issueType: 'Improvement', status: 'Open' },
				{ _id: 3, priorityType: 'Low', issueType: 'Feature', status: 'Open' },
				{ _id: 4, priorityType: 'Medium', issueType: 'Task', status: 'Open' },
				{ id: 5, priortyType: 'Lowest', issueType: 'Improvement', status: 'Open' },
				{ id: 6, priorityType: 'High', issueType: 'Improvement', status: 'Closed' }
			]
		}
	};
});

it('returns filtered and sorted result', () => {
	let result = [
		{ _id: 2, priorityType: 'High', issueType: 'Improvement', status: 'Open' },
		{ _id: 1, priorityType: 'Medium', issueType: 'Improvement', status: 'Open' },
		{ id: 5, priortyType: 'Lowest', issueType: 'Improvement', status: 'Open' }
	];

	expect(selectFilteredAndSortedIssues(state)).toEqual(result);
});

it('returns filtered result', () => {
	let result = [
		{ _id: 1, priorityType: 'Medium', issueType: 'Improvement', status: 'Open' },
		{ _id: 2, priorityType: 'High', issueType: 'Improvement', status: 'Open' },
		{ id: 5, priortyType: 'Lowest', issueType: 'Improvement', status: 'Open' }
	];

	expect(selectLabelAndStatusFilteredIssues(state)).toEqual(result);
});
