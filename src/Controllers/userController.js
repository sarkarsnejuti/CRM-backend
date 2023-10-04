const userModel = require("../Models/userModel");

const getAllUsers = async(req,res)=>{
    try{
        const users = await userModel.find({});
        return res.send(users);
    }
    catch{
        return res.status(500).send({message:err.message});
    }
}

module.exports={
    getAllUsers
}