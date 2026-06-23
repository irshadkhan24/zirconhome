const mongoose = require("mongoose")

const partySchema = new mongoose.Schema({

name:{
type:String,
required:true
},

logo:{
type:String,
required:true
}

})

module.exports = mongoose.model("Party", partySchema)