import localforage from "localforage";
const CACHE_KEY = "rollmaster_cache";

export async function loadCache() {
	// await localforage.removeItem(CACHE_KEY);
	console.log("Loading Cache.");
	let data = await localforage.getItem(CACHE_KEY);
	// If first time page load or user clears cache, init cache.
	if (!data) {
		debugger;
		console.log("Initializing Cache");
		data = [];
		await localforage.setItem(CACHE_KEY, JSON.stringify([]));
	}

	return JSON.parse(data);
}

export async function saveCache(summaries) {
	console.log(`Saving cache.`);
	await localforage.setItem(CACHE_KEY, JSON.stringify(summaries));
}
