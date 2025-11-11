//Handle side panel
chrome.action.onClicked.addListener(async (tab) => {
	try {
		// Open the sidepanel for the current tab
		await chrome.sidePanel.open({ tabId: tab.id });
		console.log("Sidepanel opened for tab:", tab.id);
	} catch (error) {
		console.error("Error opening sidepanel:", error);
	}
});

//Inject || block scripts
async function addBlockRuleForUrl(urlPattern, ruleId, checked) {
	const rule = {
		id: ruleId,
		priority: 1,
		action: { type: "block" },
		condition: {
			urlFilter: urlPattern,
			resourceTypes: ["script", "xmlhttprequest", "sub_frame", "image", "font"],
		},
	};

	console.log("[addBlockRuleForUrl] Called with:", { urlPattern, ruleId, checked, rule });
	//check for csp rule
	if (!ruleId == 8) {
		await toggleRule(rule, checked);
	} else {
		const cspRule = {
			id: ruleId,
			priority: 1,
			action: {
				type: "modifyHeaders",
				responseHeaders: [
					{
						header: "Content-Security-Policy",
						operation: "remove",
					},
				],
			},
			condition: {
				urlFilter: "*",
				resourceTypes: ["main_frame"],
			},
		};
		await toggleRule(cspRule, checked);
	}
}

async function toggleRule(rule, checked) {
	console.log("[toggleRule] Toggling rule:", rule.id, "checked:", checked);

	try {
		await chrome.declarativeNetRequest.updateDynamicRules({
			addRules: checked ? [rule] : [],
			removeRuleIds: checked ? [] : [rule.id],
		});

		console.log("[toggleRule] Updated rule successfully:", rule, "checked:", checked);
	} catch (err) {
		console.error("[toggleRule] Failed to update rule:", err);
	}
}

// listener
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	console.log("[onMessage] Got message:", msg);

	if (msg.action === "addBlockRule") {
		console.log("[onMessage] Handling addBlockRule");

		addBlockRuleForUrl(msg.pattern, msg.id, msg.checked)
			.then(() => {
				console.log("[onMessage] addBlockRule complete");
				sendResponse({ success: true });
			})
			.catch((err) => {
				console.error("[onMessage] addBlockRule error:", err);
				sendResponse({ success: false, error: String(err) });
			});

		return true; // keep sendResponse async
	}
});
