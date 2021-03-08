const { app, BrowserWindow } = require('electron');
const path = require("path");
const url = require("url");

let win;

function createWindow() {
    win = new BrowserWindow({ width: 800, height: 600 })

    win.loadURL(`file://${__dirname}/dist/GestionPapeleoFCT-Front/index.html`);
    //win.loadFile('C:\Users\Maria\Desktop\COWORKING\GestionPapeleoFCT-FRONTEND\GestionPapeleoFCT-Front\dist\GestionPapeleoFCT-Front\index.html');
    //win.loadURL('https://gestionpapeleofct.netlify.app');
    //win.loadURL(`file://${__dirname}/dist/index.html`);
   /*  win.loadURL(
        url.format({
            pathname: path.join(__dirname, `/dist/GestionPapeleoFCT-Front/index.html`),
            protocol: "file:",
            slashes: true
        })
    );  */

    win.on('closed', function () {
        win = null;
    });

}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    // macOS 
    if (process.platform != 'darwin') {
        app.quit();
    }
})

app.on('activate', function () {
    // macOs
    if (win === null) {
        createWindow();
    }
})