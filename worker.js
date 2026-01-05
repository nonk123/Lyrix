function lyrixGeniusSearchUrl(videoTitle) {
    return `https://genius.com/search?q=${encodeURIComponent(videoTitle)}`
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "openLyrics") {
        const url = lyrixGeniusSearchUrl(request.title.trimFr());
        browser.tabs.create({ url, active: true })
    }
});
