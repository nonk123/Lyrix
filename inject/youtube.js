(function () {
    const OUR_BUTTON_ID = "lyrix";
    const POPUP_QUERY = ".ytp-popup.ytp-contextmenu";

    Object.defineProperty(Node.prototype, "trimmedText", {
        get: function () {
            return this.textContent.trimFr();
        }
    });

    const menuItem = document.createElement("div");
    menuItem.className = "ytp-menuitem", menuItem.role = "menuitem", menuItem.tabIndex = "0";
    menuItem.ariaHasPopup = "false";

    const icon = document.createElement("div");
    icon.className = "ytp-menuitem-icon", icon.style.textAlign = "right";

    const iconInner = document.createElement("img");
    iconInner.style.display = "block";
    iconInner.src = "https://cdn.simpleicons.org/genius/black/white?viewbox=0+0+24+24";
    icon.appendChild(iconInner);

    const label = document.createElement("div");
    label.className = "ytp-menuitem-label", label.textContent = "Find lyrics";

    const content = document.createElement("div");
    content.className = "ytp-menuitem-content";

    menuItem.id = OUR_BUTTON_ID;
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

        browser.runtime.sendMessage({ action: "openLyrics", title });
    });
    menuItem.append(icon, label, content);

    const observer = new MutationObserver((mutations, observer) => {
        const popup = document.querySelector(POPUP_QUERY);
        const container = document.querySelector(`${POPUP_QUERY} .ytp-panel-menu`);

        if (!popup || !container)
            return;

        if (document.getElementById(OUR_BUTTON_ID)) { // the button duplicates itself sometimes???
            observer.disconnect();
            return;
        }

        popup.style.height = "auto"; // a scrollbar appears inside the popup otherwise
        container.appendChild(menuItem);
        observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
