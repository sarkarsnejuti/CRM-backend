
const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bodyparser = require("body-parser");
require('dotenv').config();

const authRoute = require("./src/Routes/authRoute");
const userRoute = require("./src/Routes/userRoute");
const serverConfig = require("./src/configs/server.configs");
const { DB_URL} = require("./src/configs/db.configs");
const ticketRoute = require("./src/Routes/ticketRoute");
//require('dotenv').config()




const app = express();
app.use(bodyparser.json());
console.log(process.env);






mongoose.connect(DB_URL,{useNewUrlParser:true})
.then( ()=>{
    console.log("connected to DB successfully");
})

.catch((err)=>{
    console.log("couldn't conect to the database", err);
})

app.listen(serverConfig.PORT, ()=>{
    console.log(`Server is up and running on PORT ${serverConfig.PORT}`);
})



authRoute(app);
userRoute(app);
ticketRoute(app);