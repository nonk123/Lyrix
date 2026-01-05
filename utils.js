String.prototype.trimFr = function () {
    return this.replace(/[\n\r\t]/g, '').trim();
}

Object.defineProperty(Node.prototype, "trimmedText", {
    get: function () {
        return this.textContent.trimFr();
    }
});
