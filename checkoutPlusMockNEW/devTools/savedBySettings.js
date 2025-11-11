const { act } = require("react");

const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
injectSBScript();

function injectSBScript() {
	if (!activeTab.id || activeTab) return;

	chrome.scripting.executeScript(
		{
			target: { tabId: activeTab.id },
			files: ["savedBy-script.js"],
		},
		() => {
			if (chrome.runtime.lastError) {
				console.error("Failed to inject content script:", chrome.runtime.lastError);
				updateStatus("Error: Could not inject content script", "error");
				return;
			}
		}
	);
}
const sbEnable = document.getElementById("sbEnable");
const sbAllowCheckout = document.getElementById("sbAllowCheckout");
sbEnable.getElementById("sbEnable").addEventListener("change", () => sendMsg(sbEnable));
sbEnable.getElementById("sbEnable").addEventListener("change", () => sendMsg(sbAllowCheckout));

function sendMsg(sender) {
	chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
		chrome.tabs.sendMessage(tab.id, { target: "savedBy-script.js", action: sender.id, checked: sender.checked });
	});
}
