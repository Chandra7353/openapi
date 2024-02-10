const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")


let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is mandatory"]
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber:{
        type:Number,
        required:true
    }
    
},

    { timestamps: true }

)



//& password bcrypt
userSchema.pre("save", async function (next) {

    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)

    

})

//& compare bcrypt password

userSchema.methods.compareMypassword = async function (password) {

    let comparepass = await bcrypt.compare(password, this.password)

    return comparepass

}


module.exports = new mongoose.model("userdata", userSchema)