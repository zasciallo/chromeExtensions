(function () {
	function sendLog(message) {
		console.log({ type: "LOG", message: message });
	}

	function checkAndUpdateStorage() {
		try {
			sendLog("Checking extensionStorage");
			const checkoutStorage = localStorage.getItem("extensionStorage");
			if (!checkoutStorage) {
				sendLog("No extensionStorage found.");
				return false;
			}
			const statusArr = ["TESTING", "DEVELOPMENT", "PAUSED"];
			let exwStatus = statusArr.find((status) => checkoutStorage.includes(status));
			if (exwStatus) {
				let exwStorage = checkoutStorage.replace(exwStatus, "ACTIVE");
				if (exwStorage !== checkoutStorage) {
					localStorage.setItem("extensionStorage", exwStorage);
					sendLog("Status changed to ACTIVE, reloading page.");
					location.reload();
					return true;
				} else {
					sendLog("Status is already ACTIVE, no reload needed.");
					return true;
				}
			} else {
				sendLog("No matching status found, no changes made.");
				return true;
			}
		} catch (error) {
			sendLog("Error in content script: " + error.message);
			return false;
		}
	}

	if (!checkAndUpdateStorage()) {
		let attempts = 0;
		const maxAttempts = 2;
		const intervalId = setInterval(() => {
			attempts++;
			if (checkAndUpdateStorage() || attempts >= maxAttempts) {
				clearInterval(intervalId);
			}
		}, 1000);
	}
})();
