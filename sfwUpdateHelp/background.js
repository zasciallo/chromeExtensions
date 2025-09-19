// Background script to handle SavedBy data retrieval
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "getSavedByData") {
		chrome.scripting
			.executeScript({
				target: { tabId: sender.tab.id },
				func: () => {
					// This runs in the main page context
					if (window.SavedBy && window.SavedBy.preferences) {
						return {
							customCSS: window.SavedBy.preferences.customCSS || "",
							customJS: window.SavedBy.preferences.customJS || "",
						};
					}
					return null;
				},
			})
			.then((results) => {
				sendResponse({ data: results[0].result });
			})
			.catch((error) => {
				console.error("Error executing script:", error);
				sendResponse({ data: null });
			});

		return true;
	}
});
