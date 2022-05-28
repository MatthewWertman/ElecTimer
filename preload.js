const { contextBridge, ipcRenderer } = require("electron");
const path = require("path");

contextBridge.exposeInMainWorld(
    "elecTimer", {
        receive: (channel, callback) => {
            const validChannels = ["elecTimerAPI"];
            if (validChannels.includes(channel)) {
                ipcRenderer.on(channel, (event, ...args) => callback(...args));
            }
        }
    }
);

window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    ipcRenderer.send("show-context-menu");
});

ipcRenderer.on("context-menu-command", (e, command) => {
    // For now, we will just log to the console
    console.log("Launching splits editor...");
    const editorModel = path.join(__dirname, "./views/models/editor.html");
    window.open(`file:///${editorModel}`, "_blank");
});
