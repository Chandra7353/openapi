const Users = require("../models/signup.models")
const jwt = require('jsonwebtoken')


let signupuser = async (req, res, next) => {
    try {
        let { name, email, password, phoneNumber } = req.body;
        let isUser = await Users.findOne({ email })
        console.log(isUser);
        if (!isUser) {
            let createUser = await Users.create({ name, email, password, phoneNumber })
            return res.status(200).json({ error: false, message: "Account created sucessfully", data: { name: createUser.name, email: createUser.email } })
        }
        return res.status(404).json({ error: true, message: "User already exists" })
    }
    catch (err) {
        next(err)
    }
}



let LoginUser = async (req, res, next) => {


    try {

        let { email, password, } = req.body;

        let isavailable = await Users.findOne({ email })

        if (!isavailable) {

            return res.status(300).json({ error: true, message: "Given email id not found any User", })
        }

        //comparing hash password
        let haspassword = await isavailable.compareMypassword(password)

        if (haspassword) {


            // JWT Token generation
            let tokengenerator = jwt.sign({ email: isavailable.email, name: isavailable.name, _id: isavailable._id, phoneNumber: isavailable.phoneNumber },
                process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRESIN })

            return res.status(201).json({ error: false, message: "User login sucessfuly", data: tokengenerator, isavailable })

        }
        else {
            return res.status(401).json({ error: true, message: "invalied password" })
        }

    }

    catch (err) {
        next(err)
    }

}


module.exports = {
    signupuser,
    LoginUser,



}