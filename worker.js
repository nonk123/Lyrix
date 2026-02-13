String.prototype.trimFr = function () {
    return this.replace(/[\n\r\t]/g, '').trim();
}

if (typeof browser === "undefined")
    globalThis.browser = chrome;

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    function geniusSearchUrl(title) {
        return `https://genius.com/search?q=${encodeURIComponent(title)}`;
    }

    if (request.action === "openLyrics") {
        const url = geniusSearchUrl(request.title.trimFr());
        browser.tabs.create({ url, active: true })
    }
});
