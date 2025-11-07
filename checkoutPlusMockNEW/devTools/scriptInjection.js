//INJECT
document.getElementById("injectScriptBtn").addEventListener("click", async () => {
	console.log("clicked");
	const status = document.getElementById("status");
	status.textContent = "Injecting...";

	try {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		if (!tab?.id) {
			status.textContent = "No active tab found.";
			return;
		}

		await chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ["devTools/Scripts/custom.js"],
		});

		status.textContent = "Injected devTools/Scripts/custom.js";
	} catch (err) {
		console.error(err);
		status.textContent = `Error: ${err.message}`;
	}
});

const SCRIPT_REL_PATH = "devTools/Scripts/custom.js";

//OPEN IN VS CODE
document.getElementById("editBtn").addEventListener("click", () => {
	chrome.storage.local.get(["localRoot"], ({ localRoot }) => {
		if (!localRoot) {
			alert("Set localRoot in chrome.storage.local first (your project folder path).");
			return;
		}
		document.getElementById("rootPath").placeholder = localRoot;

		// Make sure root ends with a slash
		let root = localRoot;
		if (!root.endsWith("/") && !root.endsWith("\\")) {
			root += "/";
		}

		const absPath = root + SCRIPT_REL_PATH;
		const vscodeUrl = "vscode://file" + encodeURI(absPath);

		console.log("[Edit] Opening in VS Code:", vscodeUrl);

		window.open(vscodeUrl, "_blank");
	});
});

//INPUT ROOT
const rootInput = document.getElementById("rootPath");
(async () => {
	const { localRoot } = await chrome.storage.local.get(["localRoot"]);
	if (localRoot) {
		rootInput.placeholder = localRoot;
	}
})();

rootInput.addEventListener("input", () => {
	chrome.storage.local.set({
		localRoot: rootInput.value,
	});
	console.log(chrome.storage.local.get(["localRoot"]));
});
