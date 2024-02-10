const  mongoose =require("mongoose")


let taskSchema = new mongoose.Schema({
    title:
    {
     type:String,
     required:true
    },
    description:{
        type:String,
     required:true

    },
    priority:{
       type:Number,
       required:true
    },
    duedate:{
        type:Date,
     required:true
    },
    userid:{
      type:String,
      required:true

    },
    status: { type: String,
         enum: [ 'DONE','TODO'], 
         default: 'TODO' },
 
})

module.exports = new mongoose.model("task",taskSchema)