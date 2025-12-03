// content-styles.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.target != "content-styles.js") {
		return;
	}
	if (msg.action === "updateStyle") {
		// Optionally take args if passed
		const arg = msg.arg || null;

		// If the element is inside a shadow root, grab it properly
		let element = document.querySelector(msg.selector);
		//cant find element
		if (!element) {
			console.warn("Element not found, styles not applied", element, msg.selector);
			return false;
		}
		if (arg.unit) {
			element.style.setProperty(arg.type, arg.value + arg.unit, "important");
		} else {
			element.style.setProperty(arg.type, arg.value, "important");
		}

		sendResponse({ element, arg });
	}
	return;
});
