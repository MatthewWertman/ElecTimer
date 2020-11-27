const {app, BrowserWindow, globalShortcut} = require("electron");

function createWindow () {
    const win = new BrowserWindow({
        title: app.name,
        width: 500,
        height: 400,
        icon: "build/icon.png",
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile("./base/index.html");

    //globals
    globalShortcut.register("num1", () => {
        console.log("Pressed num1");
        win.webContents.executeJavaScript("document.getElementById('startButton').click()");
    });
    globalShortcut.register("num3", () => {
        console.log("Pressed num3");
        win.webContents.executeJavaScript("document.getElementById('stopButton').click()");
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    globalShortcut.unregisterAll();
    if (process.platform !== "darwin") {
        app.quit();
    }
});
