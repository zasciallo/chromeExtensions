//! NGROK INSERT
//const viteClient = document.createElement("script");
// viteClient.async = true;
// viteClient.type = "module";
// viteClient.src = "https://savedby-widget.ngrok.io/@vite/client";
// document.head.appendChild(viteClient);

// // Load the widget
// const s = document.createElement("script");
// s.async = true;
// s.type = "module";
// s.src = "https://savedby-widget.ngrok.io/src/main.jsx";
// document.head.appendChild(s);

//! VERSION TESTING
let url = "https://cdn.shopify.com/extensions/ae3c2913-c231-4f06-b013-31ec99180802/savedby-package-protection-356/assets/";
let version = "v6.7.3";

document.head.append(
	Object.assign(document.createElement("script"), {
		src: url + version + ".js",
		type: "module",
	})
);
