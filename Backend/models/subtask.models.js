const mongoose = require("mongoose")


let subtaskSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true

    },
    status: {
        type: Number,
        enum: [0, 1],
        default: 0
    },

    taskid: {
        type: String,
        reauired: true
    }


})

module.exports = new mongoose.model("subtask", subtaskSchema)