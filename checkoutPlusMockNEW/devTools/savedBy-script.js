chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.target != "savedBy-script.js") {
		return;
	}
});
