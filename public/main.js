const { app, BrowserWindow, ipcMain } = require('electron')

const path = require('path')
const isDev = require('electron-is-dev')

const fs = require('fs')

require('@electron/remote/main').initialize()

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
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

// Receives communications from export button, through 'export' channel
// args = { message: string, data: object }
ipcMain.on('export', (event, args) => {
  console.log('Message received:', args.message)
  exportData(args.data)
})

async function exportData(data) {
  fs.writeFile(path.resolve(__dirname, 'export.json'), JSON.stringify(data), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
  });
}