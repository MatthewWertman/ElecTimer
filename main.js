const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");

const isDebugging = true;       //Bool for debugging

function createWindow () {
    const mainWindow = new BrowserWindow({
        title: app.name,
        width: isDebugging ? 800 : 300,
        height: isDebugging ? 600 : 85,
        frame: false,
        icon: "./build/icon.png",
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadFile(path.join(__dirname, "./views/electimer.html"));

    if (isDebugging) mainWindow.webContents.openDevTools({mode: "right"});

    // Global shortcuts
    globalShortcut.register("num1", () => {
        // send start message to elecTimer api
        mainWindow.webContents.send("elecTimerAPI", "start");
    });
    globalShortcut.register("num5", () => {
        mainWindow.webContents.send("elecTimerAPI", "stop");
    });
    globalShortcut.register("num3", () => {
        mainWindow.webContents.send("elecTimerAPI", "reset");
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    globalShortcut.unregisterAll();
    if (process.platform !== "darwin") {
        app.quit();
    }
});
