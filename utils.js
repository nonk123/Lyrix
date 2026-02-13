String.prototype.trimFr = function () {
    return this.replace(/[\n\r\t]/g, '').trim();
}

if (typeof Node !== "undefined")
    Object.defineProperty(Node.prototype, "trimmedText", {
        get: function () {
            return this.textContent.trimFr();
        }
    });

if (typeof browser === "undefined")
    globalThis.browser = chrome;
