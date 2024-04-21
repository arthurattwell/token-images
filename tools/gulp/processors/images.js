// Lint with JS Standard

// Import Node modules
const fileExists = require('file-exists')
const gulp = require('gulp')
const gm = require('gulp-gm')
const newer = require('gulp-newer')

// Local helpers
const { paths } = require('../helpers/paths.js')

const {
  defaultColorProfile, defaultColorSpace,
  defaultOutputFormat
} = require('../helpers/colour.js')

const { getFilenameFromPath } = require('../helpers/utilities.js')

// Set filetypes to convert, comma separated, no spaces
const filetypes = 'jpg,jpeg,gif,png,tif,tiff'

// Convert and optimise source images
async function images (done) {
  'use strict'

  // Options
  const outputFormat = defaultOutputFormat
  const colorProfile = defaultColorProfile
  const colorSpace = defaultColorSpace

  console.log('Processing ' + outputFormat + ' images from ' + paths.img.source)
  if (fileExists.sync('tools/profiles/' + colorProfile)) {
    gulp.src(paths.img.source + '*.{' + filetypes + '}',
      { ignore: paths.ignore.web })
      .pipe(newer(paths.img.web))
      .pipe(gm(function (gmfile) {
        // Get file details
        const filename = getFilenameFromPath(gmfile.source)
        console.log('Processing ' + filename);

        // Reset defaults (in case previous image in stream
        // set these values to something else) --
        // this is mostly here for if/when we extend this function.
        let thisColorSpace = colorSpace
        let thisColorProfile = colorProfile

        return gmfile
          .resize(800)
          .profile('tools/profiles/' + thisColorProfile)
          .colorspace(thisColorSpace)
          .quality(95)
      }).on('error', function (e) {
        console.log(e)
      }))
      .pipe(gulp.dest(paths.img.web))
  } else {
    console.log('Colour profile tools/profiles/' + colorProfile + ' not found. Exiting.')
    return
  }
  done()
}

exports.images = images
