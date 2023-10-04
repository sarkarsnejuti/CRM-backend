
const {register} = require("../Controllers/authController");
const {login} = require("../Controllers/authController");
module.exports = function(app){

    
app.post("/crm/api/v1/auth/signup", register);
app.post("/crm/api/v1/auth/signin", login);
    
}