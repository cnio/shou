#!/usr/bin/env node

var debug = require('debug')("shou")
var fs = require('fs')
var shell = require('shelljs');
var userHome = require('user-home')

var user_home_node_mudles = userHome + "/node_modules"

debug(user_home_node_mudles)

if (!fs.existsSync(user_home_node_mudles)) fs.mkdirSync(user_home_node_mudles)

var argv = process.argv;
argv.shift();

var file_path = __dirname;
var current_path = process.cwd();

var server_port = 3000;
var pre = '';

var dependencies = require(current_path + "/package.json").dependencies 

if(!dependencies){
  console.log('没有依赖，就没必要瘦身')
  return
}

var node_modules_folder = current_path + "/node_modules"


var folders = fs.readdirSync(node_modules_folder)

debug(dependencies)


var c = node_modules_folder + "/cache"


shell.rm('-rf', c) && fs.mkdirSync(c)


// var npmrc  = current_path + "/.npmrc"
  
// if (!fs.existsSync(npmrc)) {
//   fs.writeFileSync(npmrc, "\ncache='./node_modules/cache'\n")
// }else{
//   var npmrc_string = fs.readFileSync(npmrc).toString()
  
//   if (/cache=\'\.\/node_modules\/cache\'/.test(npmrc_string)) {
//     console.log('exist .npmrc config')
//   } else {
//     fs.appendFileSync(npmrc, "\ncache='./node_modules/cache'\n")
//   }
// }
  
for(var k in folders){
  var is_exist = false

  for(var i in dependencies){
    if (i == folders[k]) {
      is_exist = true
    }
  }
  
  if (folders[k] === 'cache') {
    
  } else {
    if(!is_exist){
      // console.log(folders[k])
      shell.mv('-nf', node_modules_folder+'/' + folders[k], node_modules_folder+'/cache/');
    }
  }
}

var cache_folders = fs.readdirSync(c)

for(var k in cache_folders){
  if (cache_folders[k] === 'cache' || cache_folders[k] === '_locks' ) {
    return
  }

  var dest = userHome + '/node_modules/' + cache_folders[k]
  debug(dest)
  if (fs.existsSync(dest)) {
    fs.unlinkSync(dest)
  }
  debug(c + '/' + cache_folders[k])
  fs.symlinkSync( c + '/' + cache_folders[k], dest, 'dir');
}

console.log('shou complete!')