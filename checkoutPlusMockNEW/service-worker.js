// Simple service worker - just open sidepanel when extension icon is clicked
chrome.action.onClicked.addListener(async (tab) => {
	try {
		// Open the sidepanel for the current tab
		await chrome.sidePanel.open({ tabId: tab.id });
		console.log("Sidepanel opened for tab:", tab.id);
	} catch (error) {
		console.error("Error opening sidepanel:", error);
	}
});
