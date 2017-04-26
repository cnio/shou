#!/usr/bin/env node

var fs = require('fs')
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

console.log(dependencies)

var c = node_modules_folder + "/cache"
if (!fs.existsSync(c)) fs.mkdirSync(c)


var npmrc  = current_path + "/.npmrc"
  
if (!fs.existsSync(npmrc)) {
  fs.writeFileSync(npmrc, "\ncache='./node_modules/cache'\n")
}else{
  fs.appendFileSync(npmrc, "\ncache='./node_modules/cache'\n")
}
  
for(var k in folders){  
  var is_exist = false
  
  for(var i in dependencies){
    if (i == folders[k]) {
      is_exist = true
    }
  }
  
  if(!is_exist){
    
  }
}  
  

