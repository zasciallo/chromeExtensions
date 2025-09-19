console.log("SFW Update Helper initialized");

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
	// Ctrl/Cmd + Shift + S to toggle sidebar
	if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "S") {
		e.preventDefault();
		const sidebar = document.getElementById("checkout-modifier-sidebar");
		const openIcon = document.getElementById("open-checkout-modifier-icon");

		if (sidebar && openIcon) {
			if (sidebar.style.display === "none" || !sidebar.style.display) {
				sidebar.style.display = "block";
				openIcon.style.display = "none";
			} else {
				sidebar.style.display = "none";
				openIcon.style.display = "flex";
			}
		}
	}
});

// Function to get SavedBy data - simplified approach
function getSavedByData(callback) {
	// Since we can't access the main page's window.SavedBy directly,
	// we'll start with empty values and let the user input them
	console.log("Cannot access SavedBy data from content script context");
	console.log("Starting with empty values - user can input their own data");

	// Return empty data for now
	callback({
		customCSS: "",
		customJS: "",
	});
}

function buildSidebar() {
	const sidebar = document.createElement("div");
	sidebar.id = "checkout-modifier-sidebar";
	sidebar.style.position = "fixed";
	sidebar.style.top = "0";
	sidebar.style.left = "0";
	sidebar.style.width = "300px";
	sidebar.style.height = "100%";
	sidebar.style.zIndex = "2147483647";
	sidebar.style.backgroundColor = "#fff";
	sidebar.style.display = "none";

	document.body.appendChild(sidebar); // Append sidebar to body first;

	const openIcon = document.createElement("div");
	openIcon.id = "open-checkout-modifier-icon";
	openIcon.style.position = "fixed";
	openIcon.style.top = "20px";
	openIcon.style.left = "0";
	openIcon.style.zIndex = "2147483646";
	openIcon.style.width = "30px";
	openIcon.style.height = "40px";
	openIcon.style.borderRadius = "0 20px 20px 0";
	openIcon.style.backgroundColor = "#007bff";
	openIcon.style.color = "#fff";
	openIcon.style.border = "2px solid #fff";
	openIcon.style.cursor = "pointer";
	openIcon.style.display = "flex";
	openIcon.style.alignItems = "center";
	openIcon.style.justifyContent = "center";
	openIcon.style.fontSize = "16px";
	openIcon.style.fontWeight = "bold";
	openIcon.style.fontFamily = "Arial, sans-serif";
	openIcon.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
	openIcon.style.transition = "all 0.2s ease";
	openIcon.innerHTML = "⚙️";
	openIcon.title = "SFW Update Helper (Ctrl+Shift+S)";
	document.body.appendChild(openIcon); // Append open icon to body
	openIcon.addEventListener("click", () => {
		sidebar.style.display = sidebar.style.display === "none" ? "block" : "none";
		openIcon.style.display = sidebar.style.display === "block" ? "none" : "flex";
	});

	// Add hover effects
	openIcon.addEventListener("mouseenter", () => {
		openIcon.style.backgroundColor = "#0056b3";
		openIcon.style.transform = "scale(1.1)";
	});

	openIcon.addEventListener("mouseleave", () => {
		openIcon.style.backgroundColor = "#007bff";
		openIcon.style.transform = "scale(1)";
	});

	const shadow = sidebar.attachShadow({ mode: "open" });

	const style = document.createElement("style");
	style.textContent = `
    #sidebar-content {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #333;
      padding: 20px;
      max-height: 100vh;
      overflow-y: auto;
    }
    
    #close-sidebar {
      background-color: #f44336;
      color: white;
      border: none;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 12px;
    }
    
    #close-sidebar:hover {
      background-color: #d32f2f;
    }
    
    #sidebar-content-inner {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;
    }
    
    h2 {
      margin: 0 0 10px 0;
      color: #2c3e50;
      font-size: 18px;
    }
    
    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    label {
      font-weight: 600;
      color: #2c3e50;
      font-size: 14px;
    }
    
    textarea {
      width: 100%;
      min-height: 80px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 12px;
      resize: vertical;
      box-sizing: border-box;
    }
    
    textarea:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }
    
    .textarea-controls {
      display: flex;
      gap: 8px;
      justify-content: flex-end;
    }
    
    .clear-btn, .apply-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 500;
    }
    
    .clear-btn {
      background-color: #6c757d;
      color: white;
    }
    
    .clear-btn:hover {
      background-color: #5a6268;
    }
    
    .apply-btn {
      background-color: #28a745;
      color: white;
    }
    
    .apply-btn:hover {
      background-color: #218838;
    }
    
    .actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    
    .apply-all-btn, .reset-btn {
      flex: 1;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 600;
    }
    
    .apply-all-btn {
      background-color: #007bff;
      color: white;
    }
    
    .apply-all-btn:hover {
      background-color: #0056b3;
    }
    
    .reset-btn {
      background-color: #dc3545;
      color: white;
    }
    
    .reset-btn:hover {
      background-color: #c82333;
    }
    
    .status {
      padding: 10px;
      border-radius: 4px;
      font-size: 12px;
      min-height: 20px;
    }
    
    .status.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }
    
    .status.error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }
    
    .status.info {
      background-color: #d1ecf1;
      color: #0c5460;
      border: 1px solid #bee5eb;
    }
    
    small {
      color: #6c757d;
      font-size: 11px;
      line-height: 1.4;
    }
  `;
	shadow.appendChild(style);

	// Debug window.SavedBy object
	console.log("Window object:", window);
	console.log("window.SavedBy:", window.SavedBy);
	console.log("window.SavedBy?.preferences:", window.SavedBy?.preferences);
	console.log("window.SavedBy?.preferences?.customCSS:", window.SavedBy?.preferences?.customCSS);
	console.log("window.SavedBy?.preferences?.customJS:", window.SavedBy?.preferences?.customJS);

	// Check if SavedBy exists on window
	if (window.SavedBy) {
		console.log("SavedBy object keys:", Object.keys(window.SavedBy));
		if (window.SavedBy.preferences) {
			console.log("SavedBy preferences keys:", Object.keys(window.SavedBy.preferences));
		}
	}

	const sideBarContent = document.createElement("div");
	sideBarContent.id = "sidebar-content";

	// Get SavedBy data from main page context
	getSavedByData((savedByData) => {
		const customCSS = savedByData?.customCSS || "";
		const customJS = savedByData?.customJS || "";

		console.log("Retrieved SavedBy data:", savedByData);

		sideBarContent.innerHTML = `
    <button id="close-sidebar">Close Sidebar</button>
    <div id="sidebar-content-inner"> 
      <h2>SFW Update Helper</h2>
      <p>This is a helper for SFW Updating</p>
      <p><strong>Note:</strong> Please enter your SavedBy custom CSS and JS below:</p>
      
      <div class="input-group">
        <label for="sfw-update-helper-textarea">Custom CSS:</label>
        <textarea id="sfw-update-helper-textarea" placeholder="Enter your Custom CSS here">${customCSS}</textarea>
        <div class="textarea-controls">
          <button id="clear-css-btn" class="clear-btn">Clear</button>
          <button id="apply-css-btn" class="apply-btn">Apply CSS</button>
        </div>
      </div>
      
      <div class="input-group">
        <label for="sfw-update-helper-textarea-2">Custom JS:</label>
        <textarea id="sfw-update-helper-textarea-2" placeholder="Enter your Custom JS here">${customJS}</textarea>
        <div class="textarea-controls">
          <button id="clear-js-btn" class="clear-btn">Clear</button>
          <button id="apply-js-btn" class="apply-btn">Apply JS</button>
        </div>
      </div>
      
      <div class="actions">
        <button id="apply-all-btn" class="apply-all-btn">Apply All</button>
        <button id="reset-all-btn" class="reset-btn">Reset All</button>
      </div>
      
      <div class="status" id="status-message"></div>
      
      <p><small>Tip: You can copy your SavedBy preferences from the SavedBy extension settings</small></p>
      </div>
    </div>
  `;

		// Add content to shadow DOM first, then attach listeners
		shadow.appendChild(sideBarContent);
		attachListeners(shadow);
	});

	return shadow;
}

function attachListeners(shadow) {
	// Close sidebar button
	console.log(shadow);
	shadow.querySelector("#close-sidebar").addEventListener("click", () => {
		const sidebar = document.getElementById("checkout-modifier-sidebar");
		sidebar.style.display = "none";
	});

	// Initialize style elements
	const shadowStyles = document.createElement("style");
	shadowStyles.id = "sfw-update-helper-styles";
	const sbShadow = document.querySelector("savedby-checkout-plus")?.shadowRoot;
	if (sbShadow) {
		sbShadow.appendChild(shadowStyles);
	}

	const customCSS = document.createElement("style");
	customCSS.id = "sfw-update-helper-css";
	document.head.appendChild(customCSS);

	const customJS = document.createElement("script");
	customJS.id = "sfw-update-helper-js";
	document.head.appendChild(customJS);

	// Helper function to show status messages
	function showStatus(message, type = "info") {
		const statusEl = shadow.querySelector("#status-message");
		statusEl.textContent = message;
		statusEl.className = `status ${type}`;
		setTimeout(() => {
			statusEl.textContent = "";
			statusEl.className = "status";
		}, 3000);
	}

	// Helper function to apply CSS
	function applyCSS(css) {
		const sbShadow = document.querySelector("savedby-checkout-plus")?.shadowRoot;
		if (sbShadow) {
			sbShadow.querySelector("#sfw-update-helper-styles").textContent = css;
			showStatus("CSS applied to SavedBy shadow DOM", "success");
		} else {
			showStatus("SavedBy shadow DOM not found", "error");
		}
	}

	// Helper function to apply JS
	function applyJS(js) {
		if (js.trim()) {
			try {
				// Remove existing script
				const existingScript = document.querySelector("#sfw-update-helper-js");
				if (existingScript) {
					existingScript.remove();
				}

				// Create new script
				const newScript = document.createElement("script");
				newScript.id = "sfw-update-helper-js";
				newScript.textContent = js;
				document.head.appendChild(newScript);

				showStatus("JavaScript applied successfully", "success");
			} catch (error) {
				showStatus(`JavaScript error: ${error.message}`, "error");
			}
		} else {
			showStatus("No JavaScript to apply", "info");
		}
	}

	// Clear CSS button
	shadow.querySelector("#clear-css-btn").addEventListener("click", () => {
		shadow.querySelector("#sfw-update-helper-textarea").value = "";
		showStatus("CSS cleared", "info");
	});

	// Clear JS button
	shadow.querySelector("#clear-js-btn").addEventListener("click", () => {
		shadow.querySelector("#sfw-update-helper-textarea-2").value = "";
		showStatus("JavaScript cleared", "info");
	});

	// Apply CSS button
	shadow.querySelector("#apply-css-btn").addEventListener("click", () => {
		const css = shadow.querySelector("#sfw-update-helper-textarea").value;
		applyCSS(css);
	});

	// Apply JS button
	shadow.querySelector("#apply-js-btn").addEventListener("click", () => {
		const js = shadow.querySelector("#sfw-update-helper-textarea-2").value;
		applyJS(js);
	});

	// Apply All button
	shadow.querySelector("#apply-all-btn").addEventListener("click", () => {
		const css = shadow.querySelector("#sfw-update-helper-textarea").value;
		const js = shadow.querySelector("#sfw-update-helper-textarea-2").value;

		applyCSS(css);
		applyJS(js);
	});

	// Reset All button
	shadow.querySelector("#reset-all-btn").addEventListener("click", () => {
		shadow.querySelector("#sfw-update-helper-textarea").value = "";
		shadow.querySelector("#sfw-update-helper-textarea-2").value = "";

		// Clear applied styles
		const sbShadow = document.querySelector("savedby-checkout-plus")?.shadowRoot;
		if (sbShadow) {
			sbShadow.querySelector("#sfw-update-helper-styles").textContent = "";
		}

		// Remove applied script
		const existingScript = document.querySelector("#sfw-update-helper-js");
		if (existingScript) {
			existingScript.remove();
		}

		showStatus("All content cleared and reset", "success");
	});

	// Auto-apply on blur (keep existing functionality)
	shadow.querySelector("#sfw-update-helper-textarea").addEventListener("blur", ({ target }) => {
		const css = target.value;
		if (css.trim()) {
			applyCSS(css);
		}
	});

	shadow.querySelector("#sfw-update-helper-textarea-2").addEventListener("blur", ({ target }) => {
		const js = target.value;
		if (js.trim()) {
			applyJS(js);
		}
	});
}
function createSideBar() {
	const shadow = buildSidebar();
	// attachListeners is now called inside the waitForSavedBy callback
	console.log("Sidebar created:");
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", () => {
		createSideBar();
		// createSidebarButton();
	});
} else {
	console.log("DOM already loaded");
	createSideBar();
	// createSidebarButton();
}
