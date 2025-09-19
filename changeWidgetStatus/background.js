chrome.runtime.onInstalled.addListener(() => {
	chrome.action.setBadgeText({
		text: "OFF",
	});
});

chrome.action.onClicked.addListener((tab) => {
	const checkoutPage = tab?.url?.includes("checkouts");
	chrome.action.getBadgeText({}, (currentText) => {
		const newText = currentText === "ON" ? "OFF" : "ON";
		chrome.action.setBadgeText({
			text: newText,
		});
		if (newText === "ON" && checkoutPage) {
			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				files: ["content.js"],
			});
		}
	});
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	const checkoutPage = tab?.url?.includes("checkouts");
	chrome.action.getBadgeText({}, (currentText) => {
		if (currentText === "ON" && checkoutPage) {
			if (changeInfo.status === "complete") {
				chrome.scripting.executeScript({
					target: { tabId: tabId },
					files: ["content.js"],
				});
			}
		}
	});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "LOG") {
		console.log("Content script log:", request.message);
	}
});
