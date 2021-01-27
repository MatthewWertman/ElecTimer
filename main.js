const { app, BrowserWindow, globalShortcut} = require("electron");

const isDebugging = true;       //Bool for debugging
function createWindow () {
    const mainWindow = new BrowserWindow({
        title: app.name,
        width: isDebugging ? 800 : 400,
        height: isDebugging ? 600 : 550,
        minWidth: 160,
        minHeight: 550,
        frame: false,
        icon: "./build/icon.png",
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile("./views/electimer.html");

    if (isDebugging) {
        mainWindow.openDevTools({mode: "right"});
    }

    // Global shortcuts
    globalShortcut.register("num1", () => {
        console.log("Pressed num1");
        mainWindow.webContents.executeJavaScript("document.getElementById('start-button').click()");
    });
    globalShortcut.register("num5", () => {
        console.log("Pressed num5");
        mainWindow.webContents.executeJavaScript("document.getElementById('stop-button').click()");
    });
    globalShortcut.register("num3", () => {
        console.log("Pressed num3");
        mainWindow.webContents.executeJavaScript("document.getElementById('reset-button').click()");
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
