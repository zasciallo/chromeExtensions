let currentChecklist = 1;
let checklistData = {};

function showChecklist(checklistNumber) {
	const totalChecklists = 3;
	console.log("showChecklist", checklistNumber);
	for (let i = 1; i <= totalChecklists; i++) {
		const checklist = document.getElementById(`checklist${i}`);
		if (i === checklistNumber) {
			checklist.classList.remove("hidden");
		} else {
			checklist.classList.add("hidden");
		}
	}
}

function previousChecklist() {
	if (currentChecklist > 1) {
		currentChecklist--;
		showChecklist(currentChecklist);
		populateChecklist(checklistData);
	}
}

function nextChecklist({ target }) {
	console.log(currentChecklist, "currentChecklist");
	if (target.dataset.action === "submit") {
		submitChecklist();
		return;
	}

	if (currentChecklist < 3) {
		currentChecklist++;
		showChecklist(currentChecklist);
		populateChecklist(checklistData);

		console.log(target, "target");
		if (currentChecklist === 3) {
			target.textContent = "Submit";
			target.dataset.action = "submit";
		} else {
			target.textContent = "Next";
		}
	}
}

function submitChecklist() {
	const submitDiv = document.createElement("div");
	const submitHeader = document.createElement("h2");
	const gif = document.createElement("iframe");
	submitHeader.textContent = "PUSH TO ONBOARDING";
	gif.src = "https://giphy.com/embed/cmwszWSsICZtctJfNz";

	submitDiv.appendChild(submitHeader);
	submitDiv.appendChild(gif);
	document.body.innerHTML = "";
	document.body.appendChild(submitDiv);
}

function populateChecklist(data) {
	console.log("populateChecklist", data, data[`${currentChecklist}`]);
	const checklist = document.getElementById(`checklist${currentChecklist}`);
	const checklistItems = data[`${currentChecklist}`];
	const checklistList = checklist.querySelector("ul");
	checklistList.innerHTML = "";
	console.log(checklistItems, "checklistItems");
	checklistItems.forEach((checklistItem) => {
		const listItem = document.createElement("li");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.className = "item";
		listItem.appendChild(checkbox);

		const label = document.createElement("label");
		label.textContent = checklistItem.label;
		listItem.appendChild(label);
		checklistList.appendChild(listItem);
	});
}

fetch("./checklist.json")
	.then((response) => response.json())
	.then((data) => {
		checklistData = data;
		populateChecklist(checklistData);
		showChecklist(currentChecklist);
	})
	.catch((error) => console.error("Error loading checklist data:", error));

document.getElementById("prevButton").addEventListener("click", previousChecklist);
document.getElementById("nextButton").addEventListener("click", nextChecklist);

document.addEventListener("click", (event) => {
	const extensionContainer = document.getElementById("extensionContainer");
	if (!extensionContainer.contains(event.target)) {
		event.stopPropagation();
	}
});
