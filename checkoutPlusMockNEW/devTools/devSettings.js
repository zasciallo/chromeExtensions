// listeners
const IDs = ["SFW", "HLW"];
setupScriptBlockersByID(IDs);

//func
function blockScripts(target) {
	chrome.runtime.sendMessage({
		action: "addBlockRule",
		pattern: "||cdn.shopify.com/extensions/*/savedby-*/assets/*.js",
		id: 1,
		checked: target.checked,
	});
}

function setupScriptBlockersByID(ids) {
	ids.forEach((id) => {
		const target = document.getElementById(id);
		target.addEventListener("change", () => blockScripts(target));
	});
}
