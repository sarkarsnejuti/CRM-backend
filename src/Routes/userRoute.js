
const {getAllUsers, updateUser} = require("../Controllers/userController"); 
const { verifyToken,isAdmin } = require("../Middlewares/authMiddlewares");
const { verifyUpdateRequest } = require("../Middlewares/userMiddleware");

module.exports = function(app){
app.get("/crm/api/v1/users",[verifyToken,isAdmin], getAllUsers);

app.put("/crm/api/v1/users/:userId",[verifyToken,verifyUpdateRequest], updateUser);
}
