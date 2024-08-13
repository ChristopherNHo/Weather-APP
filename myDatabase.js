var express = require("express");
var mongoose = require("mongoose");
var DataModel = require("./models/Data");
const Data = require('./Data');

let myDatabase = function() {
}

 

myDatabase.prototype.postData = function(data) {
  let obj = {name:data.name,lat:data.lat,lon:data.lon, totalIndex:data.totalIndex};
  DataModel.create(obj);
}

myDatabase.prototype.getData = function(totalIndex,res) {

  DataModel.find({totalIndex:totalIndex},function(info,error) {   
      console.log(info);
      if (error) {
          return res.json({error:true});
      }
      else if (info == null) {
          return res.json({error:true});
      }

      if (info.length == 1)    
      		return res.json({foodName:info[0].foodName,calories:info[0].calories,fats:info[0].fats,carbs:info[0].carbs,proteins:info[0].proteins,sugars:info[0].sugars,totalIndex:info[0].totalIndex});
      else
          return res.json({error:true});
   });
}
myDatabase.prototype.putData = function(oldIndex,res) {
  //let obj = {ident:data.ident,name:data.name,grade:data.grade,residence:data.residence};  
  DataModel.findOneAndUpdate({totalIndex:oldIndex},
    {totalIndex:(oldIndex-1)},function() {
    	res.json();
  });
}

myDatabase.prototype.deleteData = function(totalIndex,res) {
	console.log(totalIndex);
    DataModel.remove({totalIndex:totalIndex},function() {   
    	res.json();
    });
} 

module.exports = myDatabase;

 
