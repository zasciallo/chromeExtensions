//enable dev settings
const enableDev = document.getElementById("toggleDev");
const mockMode = document.getElementById("mockUpTools");
const devMode = document.getElementById("devTools");

enableDev.addEventListener("change", () => {
	mockMode.classList.toggle("inactive", enableDev.checked);
	devMode.classList.toggle("inactive", !enableDev.checked);
});

//true by default FOR NOW, make this a user pref saved in local storage
enableDev.checked = true;
enableDev.dispatchEvent(new Event("change"));

//on open, see what rules are active and update the state accordingly
chrome.declarativeNetRequest.getDynamicRules((rules) => {
	const toggles = [...document.getElementById("scriptingToggles").querySelectorAll("input")];
	rules.forEach((rule) => {
		toggles[Math.min(rule.id - 1, 4)].checked = true;
	});
});

//TODO:setup savedByObj script

// listeners
const IDs = ["SFW", "HLW", "OldSFW", "competitor", "CSP"];
setupScriptBlockersByID(IDs);

//func
function blockScripts(target) {
	let blockRules = new BlockRule();
	switch (target.id) {
		case "SFW":
			blockRules.id = 1;
			blockRules.pattern = "cdn.shopify.com/extensions/*/savedby-*/assets/v*.js";
			break;

		case "HLW":
			blockRules.id = 2;
			blockRules.pattern = "headless-widget.savedby.io/*";
			break;

		case "OldSFW":
			blockRules.id = 3;
			blockRules.pattern = "api.savedby.io/widget/sfw*";
			break;

		case "competitor":
			//TODO: figure out onward
			const rules = [
				new BlockRule(5, "t3micro.com/products/*"),
				new BlockRule(6, "api.shipinsure.io/v1/*"),
				new BlockRule(7, "shopify-widget.route.com/*"),
				new BlockRule(8, "cdn.orderprotection.com/cart-widget/*"),
			];
			rules.forEach((rule) => {
				sendRules(rule.pattern, rule.id, target);
			});
			break;
		case "CSP":
			blockRules.id = 4;
			blockRules.pattern = "headless-widget.savedby.io/*";
			break;

		default:
			console.warn("Failed to get script ID");
			break;
	}
	if (blockRules.id) {
		sendRules(blockRules.pattern, blockRules.id, target);
	}
}

function setupScriptBlockersByID(ids) {
	ids.forEach((id) => {
		const target = document.getElementById(id);
		target.addEventListener("change", () => blockScripts(target));
	});
}

function sendRules(pattern, id, target) {
	chrome.runtime.sendMessage({
		target: "service-worker.js",
		action: "addBlockRule",
		pattern: pattern,
		id: id,
		checked: target.checked,
	});
}

//helper obj template
class BlockRule {
	constructor(id, pattern) {
		this.id = id;
		this.pattern = `||${pattern}`;
	}
}
