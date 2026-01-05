(function () {
    const OUR_BUTTON_ID = "lyrix", ICONS_CDN = "https://cdn.simpleicons.org";

    const menuItem = document.createElement("div");
    menuItem.className = "ytp-menuitem", menuItem.role = "menuitem", menuItem.tabIndex = "0";
    menuItem.ariaHasPopup = "false";

    const iconContainer = document.createElement("div");
    iconContainer.className = "ytp-menuitem-icon", iconContainer.style.textAlign = "right";

    const icon = document.createElement("img");
    icon.style.display = "block", icon.src = `${ICONS_CDN}/genius/black/white?viewbox=0+0+24+24`;
    iconContainer.appendChild(icon);

    const label = document.createElement("div");
    label.className = "ytp-menuitem-label", label.textContent = "Find lyrics";

    const content = document.createElement("div");
    content.className = "ytp-menuitem-content";

    menuItem.id = OUR_BUTTON_ID, menuItem.append(iconContainer, label, content);
    menuItem.addEventListener("click", () => {
        let title = document.querySelector("#title h1 > yt-formatted-string").trimmedText;

        const snippet = document.querySelector("#snippet-text span > span");
        const channelName = document.querySelector("#channel-name a");

        // "BandName - Topic" channels post videos without the BandName in the title. Here we
        // extract that (if possible) and append it to the query.
        if (channelName && snippet && snippet.trimmedText.startsWith("Provided to YouTube by ")) {
            let bandName = channelName.trimmedText;
            const topicEnd = bandName.lastIndexOf(" - ");
            if (topicEnd >= 0) // some channels hide the ` - Topic` suffix somehow
                bandName = bandName.substring(0, topicEnd);
            title = bandName + " - " + title;
        }

        // Have to use a background worker to open pages from a content-script...
        browser.runtime.sendMessage({ action: "openLyrics", title });
    });

    const observer = new MutationObserver((mutations, observer) => {
        const query = ".ytp-popup.ytp-contextmenu", popup = document.querySelector(query);
        const container = document.querySelector(`${query} .ytp-panel-menu`);

        if (!popup || !container)
            return;

        if (!document.getElementById(OUR_BUTTON_ID)) // the button duplicates itself sometimes???
            container.appendChild(menuItem);
        observer.disconnect();

        // A scrollbar appears inside the popup (if the popup even shows up on the first try) unless
        // its height is set forcibly.
        const ht = `${17 + container.childElementCount * 40}px`;
        popup.style.height = container.style.height = container.parentElement.style.height = ht;
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
