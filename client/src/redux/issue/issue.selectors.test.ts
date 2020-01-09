import { selectFilteredAndSortedIssues, selectLabelAndStatusFilteredIssues } from './issue.selectors';

var state = {};

beforeEach(() => {
	state = {
		issue: {
			statusFilter: 'Open',
			labelFilter: 'Improvement',
			sortType: 'Lowest Priority',
			issues: [
				{ _id: 1, priorityType: 'High', issueType: 'Improvement', status: 'Open' },
				{ _id: 3, priorityType: 'Low', issueType: 'Feature', status: 'Open' },
				{ _id: 2, priorityType: 'Medium', issueType: 'Task', status: 'Open' },
				{ id: 4, priortyType: 'Lowest', issueType: 'Improvement', status: 'Open' },
				{ id: 5, priorityType: 'High', issueType: 'Improvement', status: 'Closed' }
			]
		}
	};
});

it('returns filtered and sorted result', () => {
	let result = [
		{ id: 4, priortyType: 'Lowest', status: 'Open', issueType: 'Improvement' },
		{ _id: 1, priorityType: 'High', issueType: 'Improvement', status: 'Open' }
	];

	expect(selectFilteredAndSortedIssues(state)).toEqual(result);
});

it('returns filtered result', () => {
	let result = [
		{ _id: 1, priorityType: 'High', issueType: 'Improvement', status: 'Open' },
		{ id: 4, priortyType: 'Lowest', status: 'Open', issueType: 'Improvement' }
	];

	expect(selectLabelAndStatusFilteredIssues(state)).toEqual(result);
});
