// SPDX-License-Identifier: Apache-2.0

const { app, BrowserWindow, ipcMain, ipcRenderer } = require('electron')
const isDev = require('electron-is-dev')
const exportData = require('./export')
require('@electron/remote/main').initialize()

const fs = require('fs');
const path = require('path');

let win = null

function createWindow() {
  // Create the browser window.
  //The current aspect ratio is 16:9 (1920x1080)
  //The minimum aspect ratio will be 16:9 (1280×720)
  //The Browser resizing ratio is set here.
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth:1280,
    minHeight: 720,
    autoHideMenuBar: true,
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

  win.on('resize', () => {
    win.reload();
  })
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

// Receives communications from export button, through 'export' channel.
// Used for exporting JSON data and PNG images.
// args = { projName, videoPath, annotatedFrames, images}
ipcMain.on('export', (event, args) => {
  exportData(args.projName, args.videoPath, args.annotatedFrames, args.images)
  .then(res => {
    win.send('exported', res)
  })
  .catch(err => {
    // Do nothing
  })
})

// Receives communications when no more annotations on a given timestamp.
// So the image corresponding to that timestamp can be deleted.
// imagePath: string
// args: { projPath, imageToDelete }
ipcMain.on('delete-image', (event, {projPath, imageToDelete}) => {

  try {
    fs.unlink(path.resolve(projPath, imageToDelete.imageName), (err) => {
      if (err) {
        // Do nothing
      }
    });
  }
  catch(err) {
    // Do nothing
  }
})

ipcMain.on('new-project', (event) => {
  console.log('new project');
  win.reload()
})
