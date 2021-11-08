const mongoose = require('mongoose');

var Employee = mongoose.model('Employee',{
    name:{ type:String },
    phnno: { type:Number },
    email:{ type:String },
    department:{ type:String },
    joindate:{ type:Date },
    enddate:{ type:Date }  ,
    experience:{ type:Number }    

});


module.exports = { Employee };