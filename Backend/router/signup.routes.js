const express = require('express')
const { signupuser, LoginUser } = require('../controller/signup.controller')


let routes = express.Router()

routes.get("/signup", signupuser)
routes.post("/login", LoginUser)



module.exports = routes