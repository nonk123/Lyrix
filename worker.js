try {
    importScripts("utils.js");
} catch (e) {
    console.error(e);
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    function geniusSearchUrl(title) {
        return `https://genius.com/search?q=${encodeURIComponent(title)}`;
    }

    if (request.action === "openLyrics") {
        const url = geniusSearchUrl(request.title.trimFr());
        browser.tabs.create({ url, active: true })
    }
});
