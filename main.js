const {app, BrowserWindow, globalShortcut} = require("electron");

function createWindow () {
    const win = new BrowserWindow({
        title: app.name,
        width: 800,
        heigt: 600,
        //width: 300,
        //height: 85,
        icon: "build/icon.png",
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile("./base/index.html");
    win.openDevTools();

    //globals
    globalShortcut.register("num1", () => {
        console.log("Pressed num1");
        win.webContents.executeJavaScript("document.getElementById('startButton').click()");
    });
    globalShortcut.register("num5", () => {
        console.log("Pressed num5");
        win.webContents.executeJavaScript("document.getElementById('stopButton').click()");
    });
    globalShortcut.register("num3", () => {
        console.log("Pressed num3");
        win.webContents.executeJavaScript("document.getElementById('resetButton').click()");
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
