const onboardingContainer = document.createElement("div");
onboardingContainer.id = "onboardingContainer";

const checklist = document.createElement("div");
checklist.id = "onboarding-checklist";
checklist.innerHTML = `
  <h2 id="header">Onboarding Checklist</h2>
  <ul id="listContainer"></ul>
`;

const actionButtons = document.createElement("div");
actionButtons.id = "actionButtons";

actionButtons.innerHTML = `
  <button id="prevButton">Previous</button>
  <button id="nextButton">Next</button>
`;

onboardingContainer.appendChild(checklist);
onboardingContainer.appendChild(actionButtons);
document.body.appendChild(onboardingContainer);

let currentChecklist = 1;
let steps = [
	{
		stepNumber: 1,
		header: "Development Setup",
		checklist: [
			{
				id: 1,
				label: "Store should be set to development",
				bodyText: "Set to development to avoid any issues with live store",
				checked: false,
			},
			{
				id: 2,
				label: "Correct fee tiers if needed",
				bodyText: "Double check onboarding notes about different fee tiers, and check if necessary to change",
				checked: false,
			},
			{
				id: 3,
				label: "Set correct widget type and variant",
				bodyText: null,
				checked: false,
			},
			{
				id: 4,
				label: "Check for any extra options to add in widget config",
				bodyText: "These can be items like opt in condition, or a render after/below",
				checked: false,
			},
			{
				id: 5,
				label: "Correct store coordinates",
				checked: false,
			},
		],
	},
	{
		stepNumber: 2,
		header: "Product Setup",
		checklist: [
			{
				id: 1,
				label: "Check that product is out of all collections",
				bodyText: null,
				checked: false,
			},
			{
				id: 2,
				label: "Images in variants",
				bodyText: null,
				checked: false,
			},
			{
				id: 3,
				label: "Set product to active",
				bodyText: null,
				checked: false,
			},
			{
				id: 4,
				label: "!IMPORTANT! Check store and search for SavedBy",
				bodyText: "Check Shop All, Featured, Recommendations, and use search bar of store. If found on live site, set product to draft",
				checked: false,
			},
			{
				id: 5,
				label: "Duplicate Theme has [SavedBy mm/dd/yyyy] format at end",
				bodyText: null,
				checked: false,
			},
		],
	},
	{
		stepNumber: 3,
		header: "Cart Setup",
		checklist: [
			{
				id: 1,
				label: "SavedBy Product hidden in cart",
				bodyText: "No SavedBy product on any cart pages, double check it does not show on changes.",
				checked: false,
			},
			{
				id: 2,
				label: "Cart totals show without SavedBy",
				bodyText: "Subtotal and cart count are not including SavedBy.",
				checked: false,
			},
			{
				id: 3,
				label: "Correct tier shows on change",
				bodyText: null,
				checked: false,
			},
			{
				id: 4,
				label: "Product hidden in collections",
				bodyText: "Check recommendations, collections, and other possibilities of our product being shown.",
				checked: false,
			},
			{
				id: 5,
				label: "Quantity change uses key",
				bodyText: null,
				checked: false,
			},
			{
				id: 6,
				label: "Empty cart component is visible",
				bodyText: null,
				checked: false,
			},
			{
				id: 7,
				label: "Check help icon popup",
				bodyText: "Ensure no styles are effecting our pop up.",
				checked: false,
			},
			{
				id: 8,
				label: "Styles fit on store",
				bodyText: "Check all widths and ensure the widget does not break/look off on the store.",
				checked: false,
			},
			{
				id: 9,
				label: "Test on major browsers",
				bodyText: "Check on safari, firefox, google, and mobile options.",
				checked: false,
			},
		],
	},
	{
		stepNumber: 4,
		header: "Check Store Values",
		cartData: [
			{
				id: 1,
				key: "item_count",
				label: "Item Count:",
			},
			{
				id: 2,
				key: "total_price",
				label: "Total Price:",
				bodyText: "Check that the cart total is correct and includes all items.",
			},
			{
				id: 4,
				key: "total_discount",
				label: "Total Discount:",
				bodyText: "Verify that any discounts applied to the cart are correct.",
			},
		],
	},
];

async function fetchCartData() {
	const response = await fetch("/cart.js?findMeNow");
	const cart = await response.json();
	const savedBy = cart.items.find((item) => item.vendor === "SavedBy");
	if (savedBy) {
		cart.item_count--;
		cart.total_price -= savedBy.discounted_price;
		cart.items = cart.items.filter((item) => item !== savedBy);
	}
	return cart;
}

populateContainer(steps);

function previousChecklist() {
	if (currentChecklist > 1) {
		currentChecklist--;
		populateContainer(steps);

		const nextButton = document.getElementById("nextButton");
		nextButton.textContent = "Next";
		nextButton.dataset.action = "next";
	}
}

function nextChecklist({ target }) {
	if (target.dataset.action === "submit") {
		submitChecklist();
		return;
	}
	console.log(target, currentChecklist);
	if (currentChecklist < steps.length) {
		currentChecklist++;
		populateContainer(steps);

		if (currentChecklist === steps.length) {
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

async function populateContainer(data) {
	const listContainer = document.getElementById("listContainer");
	listContainer.innerHTML = "";
	const listItems = data.find((step) => step.stepNumber === currentChecklist).checklist;
	if (!listItems) {
		const cartListItems = data.find((step) => step.stepNumber === currentChecklist).cartData;
		const cartData = await fetchCartData();
		console.log(cartData, 242);
		cartListItems.forEach((item) => {
			const listItem = document.createElement("li");
			const cartItem = document.createElement("h5");
			cartItem.type = "text";
			cartItem.textContent = item.label + cartData[item.key];
			listItem.appendChild(cartItem);
			listContainer.appendChild(listItem);
		});
		return;
	}
	listItems.forEach((item) => {
		const listItem = document.createElement("li");
		const checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.className = "item";
		listItem.appendChild(checkbox);

		const label = document.createElement("label");
		label.textContent = item.label;
		listItem.appendChild(label);
		listContainer.appendChild(listItem);
	});
}

dragElement(document.getElementById("onboardingContainer"));

function dragElement(elmnt) {
	var pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (document.getElementById("header")) {
		/* if present, the header is where you move the DIV from:*/
		document.getElementById("header").onmousedown = dragMouseDown;
	} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = elmnt.offsetTop - pos2 + "px";
		elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

document.getElementById("prevButton").addEventListener("click", previousChecklist);
document.getElementById("nextButton").addEventListener("click", nextChecklist);
