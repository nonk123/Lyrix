(function () {
    const OUR_BUTTON_ID = "lyrix";
    const CONTAINER_ID = "player-container";
    const BUTTON_STYLE = (function () {
        const padding = "8px";
        return `
position: absolute;
right: ${padding};
top: ${padding};
`;
    })();

    function appendLyrixButton() {
        const button = document.createElement("button");
        button.id = OUR_BUTTON_ID, button.style = BUTTON_STYLE;
        button.textContent = "Lyrix";
        button.addEventListener("click", () => {
            chrome.runtime.sendMessage({
                action: "openLyrics",
                title: document.getElementById("title").textContent,
            });
        });

        document.getElementById(CONTAINER_ID).appendChild(button);
        console.info("Lyrix button attached");
    }

    const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            if (document.getElementById(OUR_BUTTON_ID) !== null)
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
