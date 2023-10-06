const userModel = require("../Models/userModel");
const { userStatus } = require("../utils/constrants");

const getAllUsers = async(req,res)=>{
    try{
        const users = await userModel.find({});
        return res.send(users);
    }
    catch(err){
        return res.status(500).send({message:err.message});
    }
}

const updateUser = async(req,res)=>{

const {approveUser,userId} = req.metadata;
   // console.log(approveUser);
   // console.log(userId);

    try{
        if(approveUser){
           const user = await userModel.findOneAndUpdate({userId:userId},{userStatus:userStatus.approved});
           console.log("userdata");
           console.log(user);
           if(!user){
            return res.status(400).send({message:"Invalid userId Passed"});
           }
           //console.log(update);
            return res.status(200).send({message:"User approved successfully"});
        }
    }
    catch(err){
        console.log(err);

    }
}



module.exports={
    getAllUsers,updateUser
}