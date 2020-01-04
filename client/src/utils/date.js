/* summary: param: date(string)
   return array = [day = '01', month = 'January']
*/
export function getDate(date) {
	var dayAndMonth = [];
	var index = date.search('T');
	let day = date.substring(index - 2, index);

	let numberOfMonth = date.substring(index - 5, index - 3);
	let monthWord = computeMonthWord(numberOfMonth);

	dayAndMonth[0] = day;
	dayAndMonth[1] = monthWord;

	return dayAndMonth;
}

function computeMonthWord(numberOfMonth) {
	let monthWord = '';
	if (numberOfMonth === '01') {
		monthWord = 'January';
	} else if (numberOfMonth === '02') {
		monthWord = 'February';
	} else if (numberOfMonth === '03') {
		monthWord = 'March';
	} else if (numberOfMonth === '04') {
		monthWord = 'April';
	} else if (numberOfMonth === '05') {
		monthWord = 'May';
	} else if (numberOfMonth === '06') {
		monthWord = 'June';
	} else if (numberOfMonth === '07') {
		monthWord = 'July';
	} else if (numberOfMonth === '08') {
		monthWord = 'August';
	} else if (numberOfMonth === '09') {
		monthWord = 'September';
	} else if (numberOfMonth === '10') {
		monthWord = 'October';
	} else if (numberOfMonth === '11') {
		monthWord = 'November';
	} else if (numberOfMonth === '12') {
		monthWord = 'December';
	}

	return monthWord;
}
