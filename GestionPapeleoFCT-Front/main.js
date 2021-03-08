const { app, BrowserWindow } = require('electron');
const { create } = require('lodash');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: '#ffffff'
    })

    win.loadURL(`file://${__dirname}/dist/index.html`)

    win.on('closed', function () {
        win = null
    })

}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    // macOS 
    if (process.platform != 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // macOs
    if (win === null) {
        createWindow()
    }
})