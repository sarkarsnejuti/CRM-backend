const { createTicket,getTickets, getTicketDetalis } = require("../Controllers/ticketController");
const {verifyToken} = require("../Middlewares/authMiddlewares");
const { verifyCreateTicketRequest , verifyGetTicketDetalisRequest } = require("../Middlewares/ticketMiddleware");



module.exports = function(app){

    app.post("/crm/api/v1/tickets",[verifyToken,  verifyCreateTicketRequest],createTicket);
    app.get("/crm/api/v1/tickets",[verifyToken],getTickets);
    app.get("/crm/api/v1/tickets/:ticketId",[verifyToken,verifyGetTicketDetalisRequest], getTicketDetalis);


}