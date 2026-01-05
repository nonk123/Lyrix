(function () {
    function appendLyrixButton() {
        const button = document.createElement("button");
        button.textContent = "Lrx", button.id = "lyrix";
        button.addEventListener("click", () => {
            lyrixDwim(document.getElementById("title").textContent);
        });
        document.getElementById("actions").appendChild(button);
        console.info("Lyrix button attached");
    }

    const observer = new MutationObserver((mutationList, observer) => {
        for (const mutation of mutationList) {
            if (mutation.type !== "childList")
                continue;
            for (const node of mutation.addedNodes)
                if (node.id === "actions")
                    appendLyrixButton();
        }
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
})();
