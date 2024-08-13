var mongoose = require("mongoose");

var Data = mongoose.model("locations",{
    name: {
        required: true,
        unique: true,
        type:String
    },
    lat: Number,
    lon: Number,
    totalIndex: Number
});



module.exports = Data;
