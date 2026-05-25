browser.webRequest.onBeforeRequest.addListener(
	(details) => {
		const filter = browser.webRequest.filterResponseData(details.requestId);
		const chunks = [];
		
		filter.ondata = (event) => {
			chunks.push(new Uint8Array(event.data));
		};
		
		filter.onstop = () => {
			let total = 0;
			for (const c of chunks) total += c.length;
			const merged = new Uint8Array(total);
			let off = 0;
			for (const c of chunks) {
				merged.set(c, off);
				off += c.length;
			}
			
			let out = merged;
			
			try {
				const text = new TextDecoder("utf-8").decode(merged);
				const replaced = text.replace(
					/[a-zA-Z0-9]+\?\.features\.includes\([a-zA-Z0-9]+\.WebClient\)/,
					"true",
				);
				
				if (replaced !== text) {
					out = new TextEncoder().encode(replaced);
				}
			} catch (error) {
				console.error(error);
				out = merged;
			}
			
			filter.write(out);
			filter.close();
		};
		
		filter.onerror = () => {
			console.error(filter.error);
		};
		
		return {};
	},
	{ urls: ["https://web.grindr.com/assets/index-*.js*"] },
	["blocking"],
);