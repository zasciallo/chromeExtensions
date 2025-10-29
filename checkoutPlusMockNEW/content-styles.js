// content-styles.js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.target != "content-styles.js") {
		return;
	}
	if (msg.action === "updateStyle") {
		// Optionally take args if passed
		const arg = msg.arg || null;

		// If the element is inside a shadow root, grab it properly
		let btn = document.querySelector(".sb__non-covered-link");
		//cant find btn
		if (!btn) {
			console.warn("Button not found");
			return false;
		}
		if (arg.unit) {
			btn.style.setProperty(arg.type, arg.value + arg.unit, "important");
		} else {
			btn.style.setProperty(arg.type, arg.value, "important");
		}

		sendResponse({ btn, arg });
	}
	return;
});
