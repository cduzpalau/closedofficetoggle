var renderer = require("./renderer.js");
var readOffice = require ('./readOffice.js');
var formidable = require("formidable");
var util = require('util');


//Handle HTTP route "/" GET and POST 
function home(req, res) {
   
  //if url == "/"
  if (req.url === "/"){ 
    // if GET
    if (req.method=== "GET") {
      // define toggle object and initialise it as if office CLOSED, we will confirm statein the next step
      var toggle = {
        state: "", //chechbox "" or "checked"
        text: "CLOSED", //text "CLOSED" or "OPEN"
        color: "red" //color "red" or "green"
      };
      //get the closed office state from the src/office file (0=closed, 1=open)
      //on "end"
        //show checkbox with office state
      //on "error"
        //show error
      readOffice.readOffice(function (err, office) {
        if (err) {
          console.log('There was an error', err.message);
          res.statusCode = 503;
          res.end("There was an error" + err.message);
        }
        //If office is open ("0") set checkbox to "checked", text to "OPEN" and color to "green", no need to do anything if office is closed ("0") as we have already initialised the object as if it was closed
        if (office === "1") {
          toggle.state = "checked";
          toggle.text = "OPEN";
          toggle.color = "green";
        }
        console.log({ "office": toggle.text });
        //Render the page
        displayToggle(toggle);
      });
    }
    // if POST, that means we have received a AJAX POST request from the website, we will update the src/office file with the contents of the POST
    if (req.method === "POST"){
      console.log("POST received");
      processForm();
    }
      
  }

  //Parse the POST body received using formidable and  update the src/office file
  function processForm() {
    var form = new formidable.IncomingForm();
     
    form.parse(req, function (err, fields, files) {
      
      readOffice.writeOffice(fields.officeOpen,function (err, office) {
        });
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.write('received the data:\n\n');
      res.end(util.inspect({
        fields: fields,
        files: files
      }));
      
    });
  }
  
  //Render the page
  function displayToggle(tog) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    renderer.view("header", tog, res);
    renderer.view("toggle", tog, res);
    renderer.view("footer", {}, res);
    res.end();
  }
}




//Handle HTTP route "/office" GET, this is API call to get office status
function office(request, response) {
  //if URL == "/office"
  if (request.url === "/office") {
    //read contents of src/office file and respond with JSON to API call
    readOffice.readOffice(function(err,office){
      if (err) {
        console.log('There was an error',err.message);
        response.statusCode = 503;
        response.end("There was an error" + err.message);
      }
      console.log({"office":office});
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify({"office":office}));
    });
  }
}

module.exports.home=home;
module.exports.office=office;