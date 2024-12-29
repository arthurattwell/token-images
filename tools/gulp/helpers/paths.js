// Lint with JS Standard

const fsPath = require('path')

// Set up paths.
const paths = {
  img: {
    source: fsPath.normalize(process.cwd() + '/source/'),
    web: fsPath.normalize(process.cwd() + '/web/')
  },
  // Arrays of globs to ignore from tasks
  ignore: {
    web: []
  }
}

exports.paths = paths
