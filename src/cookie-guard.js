(() => {
	const BLOCKED = "_swb_consent_";
	
	const nameOf = (cookieString) =>
		String(cookieString).split(";", 1)[0].split("=", 1)[0].trim();
	
	// document.cookie
	const desc = Object.getOwnPropertyDescriptor(Document.prototype, "cookie");
	if (desc && desc.configurable && desc.get && desc.set) {
		try {
			desc.set.call(
				document,
				`${BLOCKED}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
			);
		} catch {}
		
		Object.defineProperty(document, "cookie", {
			configurable: true,
			enumerable: desc.enumerable,
			get() {
				return desc.get.call(document);
			},
			set(value) {
				if (nameOf(value) === BLOCKED) return;
				desc.set.call(document, value);
			},
		});
	}
	
	// Async Cookie Store API
	const store = window.cookieStore;
	if (store && typeof store.set === "function") {
		const originalSet = store.set.bind(store);
		store.set = function (name, value) {
			const cookieName = name && typeof name === "object" ? name.name : name;
			if (cookieName === BLOCKED) return Promise.resolve();
			return originalSet(name, value);
		};
		if (typeof store.delete === "function") {
			store.delete(BLOCKED).catch(() => {});
		}
	}
})();
