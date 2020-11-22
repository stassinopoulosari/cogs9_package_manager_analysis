const axios = require("axios"),
fs = require("fs"),
registry = require('package-stream')({
  db: 'https://replicate.npmjs.com',
  include_docs: true
});
if(!fs.existsSync("../data/npm_csv.csv")) {
fs.writeFileSync("../data/npm_csv.csv","name,uri");
var packages = [];
registry
  .on('package', (package) =>{ //console.log(package);
     fs.appendFile("../data/npm_csv.csv","\n" + package.name + "," +
       (package.other && package.other.dist ? package.other.dist.tarball : "null"),
     () => {console.log("+");})
     packages.push({
       name: package.name,
       package_uri:
         (package.other && package.other.dist ? package.other.dist.tarball : null)
    });
    console.log(packages.length);})
  .on('up-to-date', () => {
    fs.writeFileSync("../data/npm_json.json",JSON.stringify(packages))});
} else {
console.log("npm_csv.csv already exists")
}
