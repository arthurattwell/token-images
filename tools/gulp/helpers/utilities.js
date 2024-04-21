// Lint with JS Standard

// Function for getting a filename in gulp tap
function getFilenameFromPath (path) {
  'use strict'
  let filename = path.split('/').pop() // for unix slashes
  filename = filename.split('\\').pop() // for windows backslashes
  return filename
}

// Function for default gulp tap step
function getFileDetailsFromTap (file, format) {
  'use strict'

  if (!format) {
    format = 'all'
  }

  const filename = getFilenameFromPath(file.path)

  return {
    prefix: file.basename.replace('.', '').replace(' ', ''),
    filename: filename
  }
}

exports.getFilenameFromPath = getFilenameFromPath
exports.getFileDetailsFromTap = getFileDetailsFromTap
