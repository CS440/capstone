var fs = require("fs");
console.log("\n *START* \n");

//Reading in the file to parsed
var content = fs.readFileSync("\assets\\data_points\\fake.json");
console.log("Output Content : \n"+ content);
console.log("\n *EXIT* \n");

//Parsing the data file to manipulate
var jsonData = JSON.parse(content); 

//Example of Printing out some of the json
//NOTE: Alexi will be changing the json file format so that its sorted based on 
//      type of site
console.log(jsonData[0].siteName);
console.log(jsonData[4]._id);