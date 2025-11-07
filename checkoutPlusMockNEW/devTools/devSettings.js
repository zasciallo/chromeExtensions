//enable dev settings
const enableDev = document.getElementById("toggleDev");
const mockMode = document.getElementById("mockUpTools");
const devMode = document.getElementById("devTools");

enableDev.addEventListener("change", () => {
	mockMode.classList.toggle("inactive", enableDev.checked);
	devMode.classList.toggle("inactive", !enableDev.checked);
});

//on open, see what rules are active and update the state accordingly
chrome.declarativeNetRequest.getDynamicRules((rules) => {
	const toggles = [...document.getElementById("scriptingToggles").querySelectorAll("input")];
	rules.forEach((rule) => {
		toggles[rule.id - 1].checked = true;
	});
});

// listeners
const IDs = ["SFW", "HLW", "OldSFW"];
setupScriptBlockersByID(IDs);

//func
function blockScripts(target) {
	let blockRules = { id: 0, pattern: "" };
	switch (target.id) {
		case "SFW":
			blockRules.id = 1;
			blockRules.pattern = "||cdn.shopify.com/extensions/*/savedby-*/assets/v*.js";
			break;

		case "HLW":
			blockRules.id = 2;
			blockRules.pattern = "||headless-widget.savedby.io/*";
			break;

		case "OldSFW":
			blockRules.id = 3;
			blockRules.pattern = "||api.savedby.io/widget/sfw*";
			break;

		default:
			console.warn("Failed to get script ID");
			break;
	}
	chrome.runtime.sendMessage({
		action: "addBlockRule",
		pattern: blockRules.pattern,
		id: blockRules.id,
		checked: target.checked,
	});
}

function setupScriptBlockersByID(ids) {
	ids.forEach((id) => {
		const target = document.getElementById(id);
		target.addEventListener("change", () => blockScripts(target));
	});
}
