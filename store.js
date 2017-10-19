var electron = require('electron')
var yaml = require('js-yaml')
var path = require('path')
var fs = require('fs')

function Store(opts) {
  var userDataPath = (electron.app || electron.remote.app).getPath('userData')
  this.path = path.join(userDataPath, opts.configName + '.yml')
  this.data = parseDataFile(this.path, opts.defaults)
  this.getData = function() {
    this.setData()
    return this.data
  }

  this.setData = function() {
    fs.writeFileSync(this.path, yaml.safeDump(this.data))
  }
}

// class Store {
//   constructor(opts) {
//     const userDataPath = (electron.app || electron.remote.app).getPath(
//       'userData'
//     )
//     this.path = path.join(userDataPath, opts.configName + '.yml')
//     this.data = parseDataFile(this.path, opts.defaults)
//   }

//   getData() {
//     return this.data
//   }

//   get(key) {
//     return this.data[key]
//   }

//   set(key, val) {
//     this.data[key] = val
//     // fs.writeFileSync(this.path, yaml.safeDump(this.data))
//   }
// }

function parseDataFile(filePath, defaults) {
  try {
    return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    return defaults
  }
}

module.exports = Store
