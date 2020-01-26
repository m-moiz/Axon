export function sortByKey(array, key) {
	quickSort(array, 0, array.length - 1, key);
	return array;
}

function quickSort(array, left, right, key) {
	if (left < right) {
		let partitionIndex = partition(array, left, right, key);
		quickSort(array, left, partitionIndex - 1, key);
		quickSort(array, partitionIndex + 1, right, key);
	}
}

function mapPriorityStringToInt() {
	return { High: 4, Medium: 3, Low: 2, Lowest: 1, '': 0 };
}

function swapItems(array, i, pIndex) {
	let temp = array[i];
	array[i] = array[pIndex];
	array[pIndex] = temp;
	return array;
}

function partition(array, left, right, key) {
	var mapOfStringToInt = '';
	var selectType = '';

	if (key === 'Highest Priority' || key === 'Lowest Priority') {
		selectType = 'priorityType';
	}

	if (key === 'Highest Priority') {
		mapOfStringToInt = mapPriorityStringToInt();
	}

	let pivot = array[right][selectType];
	let pIndex = left;

	for (let i = left; i < right; i++) {
		if (key === 'Lowest Priority') {
			if (mapOfStringToInt[pivot] < mapOfStringToInt[array[i][selectType]]) {
				array = swapItems(array, i, pIndex);
				pIndex++;
			}
		}

		if (mapOfStringToInt[pivot] < mapOfStringToInt[array[i][selectType]]) {
			array = swapItems(array, i, pIndex);
			pIndex++;
		}

		if (!key) {
			if (pivot >= array[i]) {
				array = swapItems(array, i, pIndex);
				pIndex++;
			}
		}
	}

	array = swapItems(array, right, pIndex);
	return pIndex;
}
