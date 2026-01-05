browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === "openLyricsTab")
		browser.tabs.create({ url: request.url, active: true });
});
