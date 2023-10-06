const { userTypes } = require("../utils/constrants");


const verifyUpdateRequest =(req,res,next)=>{

    const approveUser = JSON.parse(req.query.approve);
    const userId = req.params.userId;

    if(approveUser && req.user.userType!==userTypes.admin){
        return res.status(403).send({message:"Only Admin users are allowed to approve other user"});
    }
    req.metadata={
        approveUser,userId
    }
    next();
}

module.exports={
    verifyUpdateRequest
}