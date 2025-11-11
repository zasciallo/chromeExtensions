const viteClient = document.createElement("script");
viteClient.async = true;
viteClient.type = "module";
viteClient.src = "https://savedby-widget.ngrok.io/@vite/client";
document.head.appendChild(viteClient);

// Load the widget
const s = document.createElement("script");
s.async = true;
s.type = "module";
s.src = "https://savedby-widget.ngrok.io/src/main.jsx";
document.head.appendChild(s);
