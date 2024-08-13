let path = require("path");
let express = require("express");
let router = express.Router();
let fetch = require("node-fetch");
const myDatabase = require('./myDatabase');
let db = new myDatabase();

const Data = require('./Data');

let parameters= {
    api_key: '3bb12c3b4cb2671fc6089cfa5332d1cd',
    cityInput: 'Oceanside',
    lat: 0,
    lon: 0
}
let totalIndex = 0;


router.get("/",function(req,res) {
    var thePath = path.join(__dirname,"/public/views/index.html"); 
     res.sendFile(thePath);	
});

router.get("/saved",function(req,response) {
    response.sendFile(__dirname + "/public/views/saved.html");
  });

  router.get("/citysearch",function(req,res) {
    console.log("CITY API")
  
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
    
  router.get("/tempsearch",function(req,res) {
    console.log("TEMP API")
  
    parameters.lat = req.query.latitude;
    parameters.lon = req.query.longitude;
    console.log("Latitude = " + parameters.lat);
    console.log("Longitude = " + parameters.lon);

    
    let apiUrl2 = "https://api.openweathermap.org/data/2.5/weather?lat=" + parameters.lat + "&lon=" + parameters.lon + "&appid=" + parameters.api_key + "&units=imperial";
    console.log(apiUrl2);

    fetch(apiUrl2) //fetch makes a request to the API URL 
  .then(response => {  // handles response from server
    if (!response.ok) {  //checks to make sure reponse is valid
      throw new Error('Network response was not ok');
    }
    return response.json(); 
  })
  .then(data => {
    let obj = new Data(data.name, data.coord.lat, data.coord.lon, totalIndex++);
    db.postData(obj)
    res.json({data : data});
  })
  .catch(error => {
    console.error('Error:', error);
  });

    
  });
  


    
     
    module.exports = router;