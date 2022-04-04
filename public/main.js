const { app, BrowserWindow, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const exportData = require('./export')
require('@electron/remote/main').initialize()

const fs = require('fs');
const path = require('path');

let win = null

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  })

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

//THIS IPC_MAIN function is reponsible for exporting JSON file
// Receives communications from export button, through 'export' channel
// args = { projName: string, data: object }
ipcMain.on('export', (event, args) => {
  exportData(args.projName, args.data, args.metadata, args.videoPath)
  .then(res => {
    win.send('exported', res)
  })
  .catch(err => {
    console.error(err)
  })
})
