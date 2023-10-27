

const userStatus = {
    pending:"PENDING",
    approved:"APPROVED",
    rejected:"REJECTED"
}
const ticketStatus = {
    open:"PENDING",
    inProgress:"INPROGRESS",
    blocked:"BLOCKED",
    closed:"CLOSED"
}

const userTypes={
    customer:"CUSTOMER",
    engineer:"ENGINEER",
    admin:"ADMIN"
}

module.exports={
    userStatus,
    userTypes,
    ticketStatus
}