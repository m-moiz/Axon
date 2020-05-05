export function getWordCount(str) {
	return str.split(' ').filter(function(n) {
		return n !== '';
	}).length;
}

export function getWordLength(str) {
	return str.split(' ').map((a) => a.length);
}

export function getRandomColor() {
	let letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[~~(Math.random() * 16)];
	}
	return color;
}
