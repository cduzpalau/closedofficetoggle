//Reusable async function that returns contents of file that indicates if office is closed=0 or open=1
//3. Function that handles reading from file
  // read from file, return callback with contents of file

function readOffice(callback) {
  //tools needed
  var fs = require('fs');
  
  fs.readFile('office','utf8',function(err,data){
    if (err) return callback(err);
    return callback(null,data);
  });
}

function writeOffice(office,callback) {
  //tools needed
  var fs = require('fs');
  
  fs.writeFile('office',office,'utf8',function(err,data){
    if (err) return callback(err);
  console.log("file updated with:" + office)
  });
}

module.exports.readOffice = readOffice;
module.exports.writeOffice = writeOffice;