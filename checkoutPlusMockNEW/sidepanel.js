let currentTab = null;
let currentDomain = null;
let previousDomain = null;
let injected = false;
let pickerInjected = false;
let customSelectors = [];

// Check current tab and handle domain changes
function checkCurrentTab() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (!tabs[0]) return;
		try {
			currentTab = tabs[0];
			console.log(currentTab);
			document.getElementById("currentUrl").textContent = tabs[0].url;

			// Check for domain change and reset if needed
			const url = new URL(currentTab.url);
			const newDomain = url.hostname;

			// Store previous domain
			previousDomain = currentDomain;
			currentDomain = newDomain;

			// If domain changed, reset everything
			if (previousDomain && previousDomain !== newDomain) {
				console.log(`Store changed from ${previousDomain} to ${newDomain} - resetting state`);
				resetForNewStore();
			} else {
				loadSettings();
			}
			//TODO: probably display this to the user
		} catch (e) {
			console.log("Invalid URL: ", e);
		}
	});
}

// Initialize the sidepanel
function init() {
	// Check current tab
	checkCurrentTab();

	// Set up event listeners
	document.getElementById("injectBtn").addEventListener("click", injectCheckout);
	document.getElementById("resetBtn").addEventListener("click", resetAllSettings);
	document.getElementById("removeBtn").addEventListener("click", removeAll);
	document.getElementById("enableDisclaimer").addEventListener("change", () => updateSettings());
	document.getElementById("disclaimerText").addEventListener("input", () => updateSettings());
	document.getElementById("enableDoubleButton").addEventListener("change", () => updateSettings());
	document.getElementById("feeTier").addEventListener("change", () => updateSettings());

	//Style controls hookup
	const styleControls = document.querySelectorAll("#styleControls input");
	styleControls.forEach((control) => {
		control.addEventListener("input", updateStyles);
	});

	//selector listeners
	document.getElementById("getSelector").addEventListener("click", startSelection);

	// Listen for tab changes
	chrome.tabs.onActivated.addListener((activeInfo) => {
		console.log("Tab activated:", activeInfo.tabId);
		checkCurrentTab();
	});

	// Listen for tab updates (URL changes)
	chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (changeInfo.status === "complete" && tab.active) {
			console.log("Tab updated:", tabId, tab.url);
			checkCurrentTab();
		}
	});
}

// Inject Checkout+ protection
function injectCheckout() {
	console.log("Script", injected);
	if (!currentTab || injected) return;

	// First, try to inject the content script manually
	chrome.scripting.executeScript(
		{
			target: { tabId: currentTab.id },
			files: ["content-script.js", "content-styles.js"],
		},
		() => {
			if (chrome.runtime.lastError) {
				console.error("Failed to inject content script:", chrome.runtime.lastError);
				updateStatus("Error: Could not inject content script", "error");
				return;
			}

			// Wait a moment for the script to load, then send message
			setTimeout(() => {
				chrome.tabs.sendMessage(currentTab.id, { action: "injectCheckout", target: "content-script.js", selectors: customSelectors }, function (response) {
					console.log("Response:", response);
					console.log("Last error:", chrome.runtime.lastError);
					if (chrome.runtime.lastError) {
						console.error("Error: Could not inject protection", chrome.runtime.lastError);
						updateStatus("Error: Could not inject protection", "error");
						injected = false;
					} else if (response && response.success) {
						updateStatus("Checkout+ protection injected successfully!", "success");
						injected = true;
					} else {
						updateStatus("Injection completed with warnings", "warning");
						injected = true;
					}
				});
			}, 100);
		}
	);
}

// Reset for new store (domain change)
function resetForNewStore() {
	console.log("Resetting for new store:", currentDomain);

	// Reset UI to defaults
	document.getElementById("enableDisclaimer").checked = true;
	document.getElementById("disclaimerText").value = "We highly suggest protecting your package with Checkout+ for lost, damaged, or stolen packages.";
	document.getElementById("enableDoubleButton").checked = false;
	document.getElementById("feeTier").value = "035";

	// Clear any existing content script state
	if (currentTab) {
		chrome.tabs.sendMessage(currentTab.id, { action: "resetSettings", target: "content-script.js" });
	}

	// Load fresh settings for this store
	loadSettings();

	updateStatus(`Reset for new store: ${currentDomain}`, "success");
}

// Reset all settings (manual reset)
function resetAllSettings() {
	updateSettings({
		enableDisclaimer: true,
		disclaimerText: "We highly suggest protecting your package with Checkout+ for lost, damaged, or stolen packages.",
		enableDoubleButton: false,
		feeTier: "035",
	});

	updateStatus("Settings reset to defaults", "success");
}

// Update settings
function updateSettings(settings = null) {
	if (!settings) {
		settings = {
			enableDisclaimer: document.getElementById("enableDisclaimer").checked,
			disclaimerText: document.getElementById("disclaimerText").value,
			enableDoubleButton: document.getElementById("enableDoubleButton").checked,
			feeTier: document.getElementById("feeTier").value,
		};
	}

	console.log("Settings updated:", settings);
	// Store settings with store-specific key
	const storeKey = currentDomain ? `checkoutSettings_${currentDomain}` : "checkoutSettings";
	chrome.storage.local.set({ [storeKey]: settings });

	// Send to content script
	if (currentTab) {
		chrome.tabs.sendMessage(currentTab.id, {
			action: "updateSettings",
			settings: settings,
			target: "content-script.js",
		});
	}
}

// Load saved settings
function loadSettings() {
	const storeKey = currentDomain ? `checkoutSettings_${currentDomain}` : "checkoutSettings";

	chrome.storage.local.get([storeKey], function (result) {
		if (result[storeKey]) {
			const settings = result[storeKey];
			document.getElementById("enableDisclaimer").checked = settings.enableDisclaimer !== false;
			document.getElementById("disclaimerText").value = settings.disclaimerText || "We highly suggest protecting your package with Checkout+ for lost, damaged, or stolen packages.";
			document.getElementById("enableDoubleButton").checked = settings.enableDoubleButton || false;
			document.getElementById("feeTier").value = settings.feeTier || "035";
			console.log(`Loaded settings for store: ${currentDomain}`);
		} else {
			console.log(`No saved settings for store: ${currentDomain}`);
		}
	});
}

// Update status message
function updateStatus(message, type = "success") {
	const statusDiv = document.getElementById("status");
	statusDiv.textContent = message;
	statusDiv.className = `status ${type}`;

	// Clear after 3 seconds
	setTimeout(() => {
		statusDiv.textContent = "Ready to inject Checkout+";
		statusDiv.className = "status";
	}, 3000);
}

// Initialize when page loadsgit@github.com:zasciallo/chromeExtensions.git
document.addEventListener("DOMContentLoaded", init);

//STYLE FUNCTIONS
function updateStyles(e) {
	const type = e.target.dataset.type;
	const value = e.target.value;
	const unit = e.target.dataset?.unit;
	document.getElementById(type).textContent = value;
	chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
		chrome.tabs.sendMessage(tab.id, { target: "content-styles.js", action: "updateStyle", arg: { type: type, value: value, unit: unit } }, (res) => {
			if (chrome.runtime.lastError) {
				console.error("Error:", chrome.runtime.lastError.message);
				return;
			}
			console.log("Button text:", res?.text);
		});
	});
}

//injector func
function startSelection() {
	if (pickerInjected) {
		chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
			chrome.tabs.sendMessage(tab.id, { target: "content-picker.js", action: "startPicker" });
		});
	} else {
		chrome.scripting.executeScript(
			{
				target: { tabId: currentTab.id },
				files: ["content-picker.js"],
			},
			() => {
				if (!chrome.runtime.lastError) {
					pickerInjected = true;
					const button = document.getElementById("getSelector");
					button.textContent = "Start Selecting";
					button.classList.remove("secondary");
				}
			}
		);
	}
}

chrome.runtime.onMessage.addListener((msg) => {
	if (msg.action !== "sendSelectorData") {
		return;
	}
	const textField = document.getElementById("currentSelector");
	if (msg.data.value == "") {
		textField.textContent = "No Button Found";
	} else {
		textField.textContent = msg.data.value;
		customSelectors.push(msg.data.value);
		customSelectors = [...new Set(customSelectors)];
	}
});

function removeAll() {}
