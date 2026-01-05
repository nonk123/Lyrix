(function () {
    const OUR_BUTTON_ID = "lyrix";

    const menuItem = document.createElement("div");
    menuItem.className = "ytp-menuitem", menuItem.role = "menuitem", menuItem.tabIndex = "0";
    menuItem.ariaHasPopup = "false";

    const icon = document.createElement("div");
    icon.className = "ytp-menuitem-icon";

    const label = document.createElement("div");
    label.className = "ytp-menuitem-label";
    label.textContent = "Look up lyrics";

    const content = document.createElement("div");
    content.className = "ytp-menuitem-content";

    menuItem.id = OUR_BUTTON_ID;
    menuItem.addEventListener("click", () => {
        chrome.runtime.sendMessage({
            action: "openLyrics",
            title: document.getElementById("title").textContent,
        });
    });
    menuItem.append(icon, label, content);

    function appendLyrixButton() {
        const popups = document.querySelectorAll(".ytp-popup.ytp-contextmenu");
        for (const popup of popups)
            popup.style.height = ""; // a scrollbar appears otherwise

        const candidates = document.querySelectorAll(".ytp-popup.ytp-contextmenu .ytp-panel-menu");
        for (const container of candidates)
            container.appendChild(menuItem);
    }

    const observer = new MutationObserver((mutations, observer) => {
        if (!document.getElementById(OUR_BUTTON_ID))
            appendLyrixButton();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
