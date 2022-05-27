const { contextBridge, ipcRenderer } = require("electron");

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