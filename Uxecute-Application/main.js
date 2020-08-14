const electron = require('electron')
const {app, BrowserWindow, ipcMain, globalShortcut } = electron;

let win;

process.env.NODE_ENV = 'production';
process.env.WEATHERSTACK_KEY = '' //Add your Weatherstack api key here
process.env.WEATHERSTACK_BASEURL='http://api.weatherstack.com/'
process.env.API_BASEURL= 'http://localhost:3000/' 

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({
        resizable: false,
        frame: false,
        width: 800,
        height: 480,
        webPreferences: {
            nodeIntegration: true
        }
})

    // and load the index.html of the app.
    win.loadFile('index.html')

    // Open the DevTools.
    //win.webContents.openDevTools()
}

app.whenReady().then(createWindow)
app.whenReady().then(()=>{
    globalShortcut.register('Super+CmdOrCtrl+Z', () => {
        win.focus();
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('app:exit', function(e){
    app.quit();
})