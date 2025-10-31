chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	if (msg.action === "startPicker") {
		startElementPicker();
	}
});

function startElementPicker() {
	let overlay = document.createElement("div");
	overlay.style.position = "fixed";
	overlay.style.pointerEvents = "none";
	overlay.style.zIndex = "2147483647"; //max 32bit
	overlay.style.border = "2px solid #00bfff";
	overlay.style.background = "rgba(0, 191, 255, 0.1)";
	overlay.id = "savedby-selector";
	document.body.appendChild(overlay);
	//console.log(document.body.appendChild(overlay));

	const moveHandler = (e) => {
		//console.log("mouse moved");
		const el = e.target;
		const rect = el.getBoundingClientRect();
		overlay.style.top = rect.top + window.scrollY + "px";
		overlay.style.left = rect.left + window.scrollX + "px";
		overlay.style.width = rect.width + "px";
		overlay.style.height = rect.height + "px";
	};

	const clickHandler = (e) => {
		//console.log("click");
		e.preventDefault();
		e.stopPropagation();
		cleanup();
		const classList = parseSelector(e.target);
		console.log(classList);
		chrome.runtime.sendMessage({
			action: "sendSelectorData",
			data: { source: "content-picker.js", value: classList },
		});
	};

	const cleanup = () => {
		document.removeEventListener("mousemove", moveHandler, true);
		document.removeEventListener("click", clickHandler, true);
		overlay.remove();
	};

	document.addEventListener("mousemove", moveHandler, true);
	document.addEventListener("click", clickHandler, true);
}

function parseSelector(element) {
	element = getButton(element);
	if (!element) {
		return "";
	}
	//see if multiple came back
	let selection = "." + element.className.replace(/ /g, ".");
	if (document.querySelectorAll(selection).length > 1) {
		if (element?.dataset?.type) {
			selection = `[data-type="${element.dataset.type}"]${selection}`;
		}
	}
	return selection;
}

function getButton(element) {
	//searh for elements the user likely wanted]
	const button = element.querySelector("a, button");
	if (["BUTTON", "A"].includes(element.tagName)) return element;
	if (button) return button;
}
