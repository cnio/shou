
var fs = require('fs')
var argv = process.argv;
argv.shift();

var file_path = __dirname;
var current_path = process.cwd();

var node_modules_folder = current_path + "/node_modules"

const fsextra = require('fs-extra')

// remove file
fsextra.remove(node_modules_folder+'/cache/', err => {
  if (err) return console.error(err)

  console.log('success!')
})