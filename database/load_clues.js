//var fs = require("fs");
//
//
//console.log("\n *START* \n");
//var content = fs.readFileSync("small.json");
//
//
//console.log("Output Content : \n"+ content);
//console.log("\n *EXIT* \n");

var jsonData = require("../stubs/small.json");

for(var key in jsonData) {
  console.log("key:"+ key + ", value:" + JSON.stringify(jsonData[key]));
}