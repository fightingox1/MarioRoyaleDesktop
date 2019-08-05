// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const find = require('find-process');
const plat = process.platform
var rimraf = require("rimraf");

// Clear cache
console.log(`This platform is ${process.platform}`);
if (plat === 'win32') { 
rimraf.sync("%appdata%/mario-royale-desktop-app/Cache");
};

if (plat === 'linux') { 
  rimraf.sync("~/.config/mario-royale-desktop-app/Cache");
  };
  
  if (plat === 'darwin') { 
    rimraf.sync("~/Library/Application Support/mario-royale-desktop-app/Cache");
    };


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Add the extension
  // BrowserWindow.addExtension('')
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
  })

  // and load the index.html of the app.
  mainWindow.loadURL('http://marioroyale.cyuubi.gq/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.  

find('name', 'Discord', true)
    .then(function (list) {
      console.log('There are %s Discord process(es)', list.length);
      if (list.length !== 0) {
        console.log('Running Rich Presence Code');
        const client = require('discord-rich-presence')('605040020851523585');
        client.updatePresence({
          //state: 'Running Tests',
          //details: 'Testing',
          startTimestamp: Date.now(),
          //endTimestamp: Date.now() + 1337,
          largeImageKey: 'logo',
          //smallImageKey: 'snek_small',
          instance: true,
        });
      } else {
        console.log('RPC not activated');
      };
    });



