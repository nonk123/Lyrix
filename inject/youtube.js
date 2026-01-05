(function () {
    const OUR_BUTTON_ID = "lyrix";
    const CONTAINER_ID = "top-level-buttons-computed";
    const BUTTON_CLASS = "yt-spec-button-shape-next yt-spec-button-shape-next--tonal yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m";

    function appendLyrixButton() {
        const outer = document.createElement("yt-button-view-model");
        outer.className = "ytd-menu-renderer";

        const shape = document.createElement("yt-button-shape");
        outer.appendChild(shape);

        const button = document.createElement("button");
        button.textContent = "Lrx", button.id = OUR_BUTTON_ID;
        button.className = BUTTON_CLASS;
        button.addEventListener("click", () => {
            chrome.runtime.sendMessage({
                action: "openLyrics",
                title: document.getElementById("title").textContent,
            });
        });
        shape.appendChild(button);

        const container = document.getElementById(CONTAINER_ID);
        container.appendChild(outer);

        console.info("Lyrix button attached");
    }

    const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            if (document.getElementById(OUR_BUTTON_ID))
                return;
            if (mutation.type !== "childList")
                continue;
            for (const node of mutation.addedNodes)
                if (node.id === CONTAINER_ID) {
                    appendLyrixButton();
                    break;
                }
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
