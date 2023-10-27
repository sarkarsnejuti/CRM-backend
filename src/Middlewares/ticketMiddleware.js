const ticketModel = require("../Models/ticketModel");
const { userTypes } = require("../utils/constrants");


const verifyCreateTicketRequest=(req,res,next)=>{

    const {title,description,ticketPriority} = req.body;
    if(!title){
        return res.status(400).send({message:"Title cannot be null"});
    }

    if(!description){
        return res.status(400).send({message:"Description cannot be null"});
    }
    if(ticketPriority && (!Number.isInteger(ticketPriority) || (ticketPriority<1 && ticketPriority>5))){
        return res.status(400).send({message:"Invalid Ticket priority passed"});
    }
    next();
}


const verifyGetTicketDetalisRequest = async (req,res,next)=>{

    const {ticketId} = req.params;
    const user = req.user;
    const userType = user.userType;

    if(userType===userTypes.admin){
        next();
        return;
    }

    const ticketDetalis = await ticketModel.findById(ticketId);

    if(!ticketDetalis){
        return res.status(400).send({message:"Invalid Ticket Id"});
    }

    if(userType===userTypes.customer && !ticketDetalis.requestor.equals(user._id)){
        return res.status(403).send({message:"UnAuthorized to access this Ticket Id"}); 
    }

    if(userType===userTypes.engineer && !ticketDetalis.assignee.equals(user._id)){
        return res.status(403).send({message:"UnAuthorized to access this Ticket Id"}); 
    }

    next();

}
module.exports={
    verifyCreateTicketRequest,
    verifyGetTicketDetalisRequest
}