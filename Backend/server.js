const express = require('express')
require("dotenv").config()
require("./config/ConnectionDb")
const cors = require('cors')
const  signuprouter=require("./router/signup.routes")
const taskroutes = require("./router/task.routes")
const subtaskrouter=require("./router/subtask.routes")


let app = express()

app.use(express.json())
app.use(cors())
app.use("/api/user",signuprouter) 
app.use("/api/task",taskroutes)
app.use("/api/subtask", subtaskrouter)

//page not found middalware
app.use("*", (req, res, next)=>{
    res.status(404).json("Page n found")
 })

 //ERROR handling middalware
 app.use((err,req, res, next)=>{
    res.status(400).json({error:true,message:err.message ,data:"error data !!!!!!!!!!!!!"})
 })

app.listen(process.env.PORT, ()=>{
    console.log(`server running sucessfully PORT No ${process.env.PORT}`);
} )