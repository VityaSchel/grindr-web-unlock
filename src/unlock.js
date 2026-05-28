(() => {
	const FEATURE = "WebClient";
	const original = JSON.parse;

	JSON.parse = function (text, reviver) {
		const result = original.call(this, text, reviver);
		try {
			if (
				result &&
				typeof result === "object" &&
				Array.isArray(result.features) &&
				Array.isArray(result.roles) &&
				!result.features.includes(FEATURE)
			) {
				result.features.push(FEATURE);
			}
		} catch {}
		return result;
	};
})();
