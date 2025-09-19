let currentTab = null;

// Initialize the sidepanel
function init() {
	// Get current tab info
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (tabs[0]) {
			currentTab = tabs[0];
			document.getElementById("currentUrl").textContent = tabs[0].url;
			updatePageStatus();

			// Reset settings for new page
			resetSettingsForNewPage();
		}
	});

	// Set up event listeners
	document.getElementById("injectBtn").addEventListener("click", injectCheckout);
	document.getElementById("removeBtn").addEventListener("click", removeProtection);
	document.getElementById("enableDisclaimer").addEventListener("change", updateSettings);
	document.getElementById("disclaimerText").addEventListener("input", updateSettings);
	document.getElementById("enableDoubleButton").addEventListener("change", updateSettings);
	document.getElementById("feeTier").addEventListener("change", updateSettings);
}

// Reset settings when opening side panel on new page
function resetSettingsForNewPage() {
	console.log("Resetting settings for new page...");

	// Reset to default values
	document.getElementById("enableDisclaimer").checked = true;
	document.getElementById("disclaimerText").value = "We highly suggest protecting your package with Checkout+ for lost, damaged, or stolen packages.";
	document.getElementById("enableDoubleButton").checked = false;
	document.getElementById("feeTier").value = "035";

	// Clear any existing status messages
	const statusDiv = document.getElementById("status");
	statusDiv.textContent = "✅ Ready to inject checkout protection";
	statusDiv.className = "status";

	// Send reset command to content script
	if (currentTab) {
		chrome.tabs.sendMessage(
			currentTab.id,
			{
				action: "resetSettings",
			},
			function (response) {
				if (chrome.runtime.lastError) {
					console.log("No content script response (normal for non-ecommerce pages)");
				}
			}
		);
	}
}

function updatePageStatus() {
	if (!currentTab) return;

	// Enhanced e-commerce detection
	const url = currentTab.url.toLowerCase();
	const isEcommercePage = detectEcommercePageFromUrl(url);

	console.log("currentTab", currentTab);
	console.log("window.location", window);

	const statusEl = document.getElementById("pageStatus");
	const statusDiv = document.getElementById("status");

	if (isEcommercePage) {
		statusEl.textContent = "E-commerce page detected - Ready for injection";
		statusDiv.textContent = "✅ E-commerce page detected - Ready for injection";
		statusDiv.className = "status";
	} else {
		statusEl.textContent = "Not an e-commerce page - Limited functionality";
		statusDiv.textContent = "⚠️ Not an e-commerce page - Limited functionality";
		statusDiv.className = "status warning";
	}
}

// Enhanced e-commerce detection for side panel
function detectEcommercePageFromUrl(url) {
	return url.includes("/checkout");
}

function injectCheckout() {
	if (!currentTab) return;

	chrome.tabs.sendMessage(currentTab.id, { action: "injectCheckout" }, function (response) {
		if (chrome.runtime.lastError) {
			document.getElementById("status").textContent = "❌ Error: Could not inject protection";
			document.getElementById("status").className = "status error";
		} else if (response && response.success) {
			document.getElementById("status").textContent = "✅ Checkout+ protection injected successfully!";
			document.getElementById("status").className = "status";
		} else {
			document.getElementById("status").textContent = "⚠️ Injection completed with warnings";
			document.getElementById("status").className = "status warning";
		}
	});
}

function removeProtection() {
	if (!currentTab) return;

	chrome.tabs.sendMessage(currentTab.id, { action: "removeProtection" }, function (response) {
		if (chrome.runtime.lastError) {
			document.getElementById("status").textContent = "❌ Error: Could not remove protection";
			document.getElementById("status").className = "status error";
		} else {
			document.getElementById("status").textContent = "✅ Protection removed successfully!";
			document.getElementById("status").className = "status";
		}
	});
}

function updateSettings() {
	const settings = {
		enableDisclaimer: document.getElementById("enableDisclaimer").checked,
		disclaimerText: document.getElementById("disclaimerText").value,
		enableDoubleButton: document.getElementById("enableDoubleButton").checked,
		feeTier: document.getElementById("feeTier").value,
	};

	// Store settings in chrome storage
	chrome.storage.local.set({ checkoutSettings: settings }, function () {
		console.log("Settings saved:", settings);
	});

	// Send settings to content script
	if (currentTab) {
		chrome.tabs.sendMessage(currentTab.id, {
			action: "updateSettings",
			settings: settings,
		});
	}
}

// Load saved settings
function loadSettings() {
	chrome.storage.local.get(["checkoutSettings"], function (result) {
		if (result.checkoutSettings) {
			const settings = result.checkoutSettings;
			document.getElementById("enableDisclaimer").checked = settings.enableDisclaimer !== false;
			document.getElementById("disclaimerText").value = settings.disclaimerText || "We highly suggest protecting your package with Checkout+ for lost, damaged, or stolen packages.";
			document.getElementById("enableDoubleButton").checked = settings.enableDoubleButton !== false;
			document.getElementById("feeTier").value = settings.feeTier || "035";
		}
	});
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
	loadSettings();
	init();
});
