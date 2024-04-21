// Lint with JS Standard

// Import modules
// Using parallel to make extending
// this easier, if needed later.
const { watch, parallel } = require('gulp')

// Import tasks
const { images } = require('./tools/gulp/processors/images.js')

exports.default = function() {
    watch('source/*.*', parallel(images))
}

exports.run = parallel(images)
