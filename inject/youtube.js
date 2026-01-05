// This is free and unencumbered software released into the public domain.
//
// Anyone is free to copy, modify, publish, use, compile, sell, or
// distribute this software, either in source code form or as a compiled
// binary, for any purpose, commercial or non-commercial, and by any
// means.
//
// In jurisdictions that recognize copyright laws, the author or authors
// of this software dedicate any and all copyright interest in the
// software to the public domain. We make this dedication for the benefit
// of the public at large and to the detriment of our heirs and
// successors. We intend this dedication to be an overt act of
// relinquishment in perpetuity of all present and future rights to this
// software under copyright law.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
// OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// For more information, please refer to <https://unlicense.org>

(function () {
    const OUR_BUTTON_ID = "lyrix";
    const POPUP_QUERY = ".ytp-popup.ytp-contextmenu";

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
        chrome.runtime.sendMessage({
            action: "openLyrics",
            title: document.getElementById("title").textContent,
        });
    });
    menuItem.append(icon, label, content);

    const observer = new MutationObserver((mutations, observer) => {
        const popup = document.querySelector(POPUP_QUERY);
        const container = document.querySelector(`${POPUP_QUERY} .ytp-panel-menu`);

        if (!popup || !container)
            return;

        popup.style.height = "auto"; // a scrollbar appears inside it otherwise
        container.appendChild(menuItem);
        observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
