const newFeeTiers = [
	1.47, 2.67, 3.97, 5.47, 6.97, 8.47, 9.97, 11.47, 12.97, 14.47, 15.97, 17.47, 18.97, 20.47, 21.97, 23.47, 24.97, 26.47, 27.97, 29.47, 30.97, 32.47, 33.97, 35.47, 36.97, 38.47, 39.97, 41.47, 42.97,
	44.47, 45.97, 47.47, 48.97, 50.47, 51.97, 53.47, 54.97, 56.47, 57.97, 59.47,
];

const feeTiers = document.querySelectorAll(".MuiTableBody-root .MuiTableRow-root");

feeTiers.forEach((tier) => {
	const inputElement = tier.querySelector("input");
	console.log(inputElement);
	if (!newFeeTiers.length || !inputElement) return;
	const newValue = newFeeTiers.shift();
	if (inputElement.value > newValue) return;
	const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
	nativeInputValueSetter.call(inputElement, newValue);

	const inputEvent = new Event("input", { bubbles: true });
	const changeEvent = new Event("change", { bubbles: true });

	inputElement.dispatchEvent(inputEvent);
	inputElement.dispatchEvent(changeEvent);
});
