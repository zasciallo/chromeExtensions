//globals
let sbAllow = true;

chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
	const activeTab = tabs[0];
	if (!activeTab) {
		console.error("No active tab found");
		return;
	}
	injectSBScript(activeTab);
});

function injectSBScript(activeTab) {
	if (!activeTab.id || !activeTab || activeTab.url.startsWith("chrome://")) return;
	//console.log("Injecting SavedBy Script into tab:", activeTab);
	chrome.scripting.executeScript(
		{
			target: { tabId: activeTab.id },
			files: ["devTools/savedBy-script.js"],
		},
		() => {
			if (chrome.runtime.lastError) {
				console.error("Failed to inject content script:", chrome.runtime.lastError);
				updateStatus("Error: Could not inject content script", "error");
				return;
			} else {
				console.log("!SavedBy Object Setting init!");
			}
		}
	);
}
//TODO REFACTOR AND CLEAN SETUP
const sbEnable = document.getElementById("sbEnable");
const sbAllowCheckout = document.getElementById("sbAllowCheckout");
const settings = [sbEnable, sbAllowCheckout];
sbEnable.addEventListener("change", () => sendMsg(sbEnable));
sbAllowCheckout.addEventListener("change", () => sendMsg(sbAllowCheckout));

function sendMsg(initiator) {
	chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
		UpdateSB(initiator.checked, initiator.id, tab);
	});
}

function UpdateSB(checked, id, tab) {
	console.log(checked, id);
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		world: "MAIN",
		func: (checked, id) => {
			if (!window.SavedBy) {
				console.warn("window.SavedBy is not available");
				return;
			}
			switch (id) {
				case "sbEnable":
					window.SavedBy.enabled = !checked;
					break;

				case "sbAllowCheckout":
					sbAllow = checked;
					window.SavedBy.onCheckout(() => {
						return !window.sbAllow;
					});
					break;

				default:
					console.log("savedBySettings.js made an unknown request to the sb Object: ", id);
					break;
			}
		},
		args: [checked, id],
	});
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status != "complete") return;
	//reinit SB obj settings on reload
	settings.forEach((setting) => {
		UpdateSB(setting.checked, setting.id, tab);
	});
	console.log(changeInfo);
});
