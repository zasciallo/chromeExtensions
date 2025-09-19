chrome.runtime.onInstalled.addListener(() => {
	chrome.action.setBadgeText({
		text: "OFF",
	});
});

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
	const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
	// Next state will always be the opposite
	const nextState = prevState === "ON" ? "OFF" : "ON";

	// Set the action badge to the next state
	await chrome.action.setBadgeText({
		tabId: tab.id,
		text: nextState,
	});

	if (nextState === "ON") {
		await chrome.scripting.executeScript({
			files: ["inject.js"],
			target: { allFrames: true, tabId: tab.id },
		});
	} else if (nextState === "OFF") {
		await chrome.scripting.executeScript({
			files: ["inject.js"],
			target: { allFrames: true, tabId: tab.id },
		});
	}
});
