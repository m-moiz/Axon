export function toggleWithOpeningAnimation(toggleShow, toggleOpeningAnimation, duration) {
	return new Promise((resolve, reject) => {
		toggleShow();
		toggleOpeningAnimation();
		setTimeout(() => {
			toggleOpeningAnimation();
			resolve(1);
		}, duration);
	});
}

export async function toggleWithClosingAnimation(toggleShow, toggleClosingAnimation, duration) {
	return new Promise((resolve, reject) => {
		toggleClosingAnimation();
		setTimeout(() => {
			toggleClosingAnimation();
			toggleShow();
			resolve(1);
		}, duration);
	});
}
