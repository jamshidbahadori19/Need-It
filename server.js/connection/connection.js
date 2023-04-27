const mongoose = require("mongoose")
require("dotenv").config()

mongoose.connect(process.env.DataBase_uri)
.then(()=>{console.log("database connected...")})
.catch((error)=>{console.log("database_Error:",error )})