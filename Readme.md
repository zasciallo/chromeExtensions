# Chrome Extensions Collection

A collection of Chrome Extensions and useful code snippets for development and testing purposes.

## 📁 Extensions Overview

### 1. **Auto Inject Script** (`/autoInjectScript/`)

**Purpose**: Automatically injects scripts into web pages with toggle functionality.

**Key Features**:

- Toggle ON/OFF badge functionality
- Script injection on demand
- Works across all frames

**Manifest V3 Features**:

```json
{
	"permissions": ["scripting", "activeTab"],
	"background": { "service_worker": "background.js" }
}
```

**Useful Snippet - Toggle Badge**:

```javascript
chrome.action.onClicked.addListener(async (tab) => {
	const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
	const nextState = prevState === "ON" ? "OFF" : "ON";

	await chrome.action.setBadgeText({
		tabId: tab.id,
		text: nextState,
	});

	if (nextState === "ON") {
		await chrome.scripting.executeScript({
			files: ["inject.js"],
			target: { allFrames: true, tabId: tab.id },
		});
	}
});
```

---

### 2. **Change Widget Status** (`/changeWidgetStatus/`)

**Purpose**: Manages widget status on checkout pages with automatic script injection.

**Key Features**:

- Checkout page detection
- Automatic script injection on page updates
- Message passing between content and background scripts

**Useful Snippet - Page Detection & Auto-Injection**:

```javascript
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
```

---

### 3. **Checkout Plus Mock** (`/checkoutPlusMock/` & `/checkoutPlusMockNEW/`)

**Purpose**: Replaces Shopify checkout buttons with custom Checkout+ widgets.

**Key Features**:

- Side panel integration
- Content script injection
- Widget replacement functionality
- Web accessible resources

**Manifest V3 Side Panel**:

```json
{
	"side_panel": { "default_path": "sidepanel.html" },
	"permissions": ["sidePanel", "activeTab", "tabs", "storage", "scripting"],
	"content_scripts": [
		{
			"matches": ["https://*/*", "http://*/*"],
			"js": ["content-script.js"],
			"run_at": "document_end"
		}
	]
}
```

---

### 6. **New Fee Tiers** (`/newFeeTiers/`)

**Purpose**: Automatically updates fee tier values in forms.

**Key Features**:

- Array-based value mapping
- Form input manipulation
- Event dispatching for React components

**Useful Snippet - Form Input Manipulation**:

```javascript
const newFeeTiers = [
	1.47, 2.67, 3.97, 5.47, 6.97, 8.47, 9.97, 11.47, 12.97, 14.47, 15.97, 17.47, 18.97, 20.47, 21.97, 23.47, 24.97, 26.47, 27.97, 29.47, 30.97, 32.47, 33.97, 35.47, 36.97, 38.47, 39.97, 41.47, 42.97,
	44.47, 45.97, 47.47, 48.97, 50.47, 51.97, 53.47, 54.97, 56.47, 57.97, 59.47,
];

feeTiers.forEach((tier) => {
	const inputElement = tier.querySelector("input");
	if (!newFeeTiers.length || !inputElement) return;

	const newValue = newFeeTiers.shift();
	if (inputElement.value > newValue) return;

	// Use native setter to update value
	const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
	nativeInputValueSetter.call(inputElement, newValue);

	// Dispatch events for React components
	const inputEvent = new Event("input", { bubbles: true });
	const changeEvent = new Event("change", { bubbles: true });

	inputElement.dispatchEvent(inputEvent);
	inputElement.dispatchEvent(changeEvent);
});
```

---

## 🛠️ Common Chrome Extension Patterns

### Manifest V3 Essentials

```json
{
	"manifest_version": 3,
	"name": "Extension Name",
	"version": "1.0",
	"permissions": ["activeTab", "scripting", "storage"],
	"host_permissions": ["https://*/*"],
	"background": { "service_worker": "background.js" },
	"action": { "default_popup": "popup.html" },
	"content_scripts": [
		{
			"matches": ["https://*/*"],
			"js": ["content.js"],
			"run_at": "document_end"
		}
	]
}
```

### Script Injection

```javascript
// Inject script on demand
chrome.scripting.executeScript({
	target: { tabId: tab.id },
	files: ["script.js"],
});

// Inject with all frames
chrome.scripting.executeScript({
	target: { allFrames: true, tabId: tab.id },
	files: ["script.js"],
});
```

### Message Passing

```javascript
// Background to Content
chrome.tabs.sendMessage(tabId, { type: "MESSAGE", data: payload });

// Content to Background
chrome.runtime.sendMessage({ type: "MESSAGE", data: payload });

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "MESSAGE") {
		// Handle message
		sendResponse({ success: true });
	}
});
```

### Storage API

```javascript
// Set data
chrome.storage.local.set({ key: "value" });

// Get data
chrome.storage.local.get(["key"], (result) => {
	console.log(result.key);
});

// Clear data
chrome.storage.local.clear();
```

### Tab Management

```javascript
// Get current tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	const currentTab = tabs[0];
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete") {
		// Page loaded
	}
});
```

## 🚀 Development Tips

1. **Use Chrome DevTools**: Extensions have their own DevTools for debugging
2. **Test in Incognito**: Some extensions behave differently in incognito mode
3. **Reload Extensions**: Use `chrome://extensions/` to reload after changes
4. **Check Permissions**: Be mindful of requested permissions
5. **Content Security Policy**: Be aware of CSP restrictions in content scripts

## 📝 Notes

- All extensions use Manifest V3
- Extensions are designed for development and testing purposes
- Some extensions are specific to Shopify/e-commerce workflows
- Code snippets can be reused across different extension projects

---

_This collection represents various Chrome Extension development patterns and utilities for SavedBy development workflows._
