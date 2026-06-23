const Party = require("../models/party")

exports.getParties = async (req,res)=>{

const parties = await Party.find()
res.json(parties)

}


exports.addParty = async (req,res)=>{

try{

if(!req.file){
return res.status(400).json({msg:"Logo is required"})
}

const party = new Party({

name:req.body.name,
logo:"/uploads/"+req.file.filename

})

await party.save()

res.json(party)

}catch(err){

res.status(500).json({error:err.message})

}

}


exports.updateParty = async (req,res)=>{

const updateData={
name:req.body.name
}

if(req.file){
updateData.logo="/uploads/"+req.file.filename
}

await Party.findByIdAndUpdate(req.params.id,updateData)

res.json({msg:"Updated"})

}


exports.deleteParty = async (req,res)=>{

await Party.findByIdAndDelete(req.params.id)

res.json({msg:"Deleted"})

}