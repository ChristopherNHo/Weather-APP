let path = require("path");
let express = require("express");
let router = express.Router();
let fetch = require("node-fetch");

let parameters= {
    api_key: '3bb12c3b4cb2671fc6089cfa5332d1cd',
    cityInput: 'Oceanside'
}


router.get("/",function(req,res) {
    var thePath = path.join(__dirname,"/public/views/index.html"); 
     res.sendFile(thePath);	
});

router.get("/total",function(req,response) {
    response.sendFile(__dirname + "/public/views/total.html");
  });
router.get("/about",function(req,response) {
    response.sendFile(__dirname + "/public/views/about.html");
  });

  router.get("/citysearch",function(req,res) {
    console.log("GET REQUEST")
  
    parameters.cityInput = req.query.city;
    console.log(parameters.cityInput);
    let apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ parameters.cityInput + '&limit=1&appid='+ encodeURIComponent(parameters.api_key)
    console.log(apiUrl);

    fetch(apiUrl) //fetch makes a request to the API URL 
  .then(response => {  // handles response from server
    if (!response.ok) {  //checks to make sure reponse is valid
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then(data => {
    console.log("DATA");
    console.log(data);
    res.json({data : data});
  })
  .catch(error => {
    console.error('Error:', error);
  });

    
  });
    
    
    
     
    module.exports = router;