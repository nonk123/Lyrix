function lyrixGeniusSearchUrl(videoTitle) {
    return `https://genius.com/search?q=${encodeURIComponent(videoTitle)}`
}

function lyrixDwim(videoTitle) {
    chrome.runtime.sendMessage({
        action: "openLyricsTab",
        url: lyrixGeniusSearchUrl(videoTitle.trim()),
    });
}
