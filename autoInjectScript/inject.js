(function () {
	const s1 = document.createElement("script");
	Object.assign(s1, {
		src: "http://localhost:3000/@vite/client",
		async: true,
		type: "module",
	});

	const s2 = document.createElement("script");
	Object.assign(s2, {
		src: "http://localhost:3000/src/main.jsx",
		async: true,
		type: "module",
	});

	document.head.append(s1, s2);

	return false;
})();
