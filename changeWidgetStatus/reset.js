(function () {
	console.log("Resetting widget status");

	const extensionStorage = localStorage.getItem("extensionStorage");

	if (extensionStorage && extensionStorage.includes("ACTIVE")) {
		localStorage.removeItem("extensionStorage");
		location.reload();
	}
})();
