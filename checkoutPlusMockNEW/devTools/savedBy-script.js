// chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
// 	if (msg.target != "savedBy-script.js") {
// 		return;
// 	} else {
// 		UpdateSB(msg);
// 	}
// });

function UpdateSB(msg, sender) {
	chrome.scripting.executeScript({
		target: { tabId: sender.tab.id },
		world: "MAIN",
		func: (msg) => {
			console.log("SAVEDBY?: ", window.SavedBy);

			if (!window.SavedBy) {
				console.warn("window.SavedBy is not available");
				return;
			}

			switch (msg.action) {
				case "sbEnable":
					window.SavedBy.enabled = msg.check;
					break;

				case "sbAllowCheckout":
					// ignore
					break;

				default:
					console.log("savedBy-script.js made an unknown request: ", msg.action);
					break;
			}
		},
		args: [msg],
	});
}
