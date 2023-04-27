const express = require("express")
const connection = require("./connection/connection")
const app = express()
const router = require("./router/router")
app.use(express.json())

app.use("/",router)
const port = 3000;
app.listen(port,(req,res)=>{console.log(`listening to the port ${port}`)})
