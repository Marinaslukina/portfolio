export function createLoader() {
	const spinnerBox = document.createElement('div');
	spinnerBox.classList.add('spinner-box');
	const circleBorder = document.createElement('div');
	circleBorder.classList.add('circle-border');
	const circleCore = document.createElement('div');
	circleCore.classList.add('circle-core');

	circleBorder.append(circleCore);
	spinnerBox.append(circleBorder);
	return spinnerBox;
}
