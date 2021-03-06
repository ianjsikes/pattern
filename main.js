var resolvePath = require('electron-collection/resolve-path')
var defaultMenu = require('electron-collection/default-menu')
var electron = require('electron')
var path = require('path')

var BrowserWindow = electron.BrowserWindow
var Menu = electron.Menu
var app = electron.app

var win

var windowStyles = {
  width: 800,
  height: 400,
  titleBarStyle: 'hidden-inset',
  minWidth: 640,
  minHeight: 395,
  icon: path.join(__dirname, 'assets/icon.png'),
}

app.setName('pattern')

var shouldQuit = app.makeSingleInstance(createInstance)
if (shouldQuit) app.quit()

app.on('ready', function() {
  win = new BrowserWindow(windowStyles)
  win.loadURL('file://' + resolvePath('./index.html'))

  win.webContents.on('did-finish-load', function() {
    win.show()
    var menu = Menu.buildFromTemplate(defaultMenu(app, electron.shell))
    Menu.setApplicationMenu(menu)
    if (process.env.NODE_ENV === 'development') {
      win.webContents.openDevTools({ mode: 'detach' })
    }
  })

  win.on('closed', function() {
    win = null
  })
})

app.on('window-all-closed', function() {
  app.quit()
})

function createInstance() {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
}
