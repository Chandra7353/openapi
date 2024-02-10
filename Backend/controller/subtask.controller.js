let SubTask = require("../models/subtask.models")


let addsubTask = async (req, res, next) => {
    try {
        let { taskid, title, description } = req.body;
        taskid = req.task._id;

        let task = await SubTask.create({ taskid, title, description });


        if (task) {
            return res.status(201).json({ error: false, message: "SubTask Added Successfully", data: task })
        }
        return res.status(500).json({ error: false, message: "invalid Subtask", data: task })
    }
    catch (err) {
        next(err)
    }
}


let getasubAllTask = async (req, res, next) => {
    try {

        let task = await SubTask.find({});

        if (!task.length) {

            return res.status(404).json({ error: true, message: "No SubTask Available", data: task })
        }
        return res.status(200).json({ error: false, message: "SubTasks fetched Successfully", data: task })

    }
    catch (err) {
        next(err)
    }
}



let getsubSingleTask = async (req, res, next) => {
    try {


        let task = await SubTask.findOne({ _id: req.params.id });

        if (task) {
            return res.status(200).json({ error: false, message: "SubTask Fetched Successfully", data: task })
        }
        return res.status(404).json({ error: true, message: "No SubTask Found" })
    }
    catch (err) {
        next(err)
    }
}

let updatesubTask = async (req, res, next) => {
    try {
        let isTaskAvailable = await SubTask.findOne({ _id: req.params.id })

        if (!isTaskAvailable) {
            return res.status(404).json({ error: true, message: "No SubTask Found" })
        }

        let task = await SubTask.findOneAndUpdate({ _id: req.params.id }, { $set: { status: "1", ...req.body } }, { new: true, runValidators: true });
        console.log(task);
        return res.status(200).json({ error: false, message: "SubTask Updated Successfully", data: task })
    }
    catch (err) {
        next(err)
    }
}

let deletesubTask = async (req, res, next) => {
    try {
        let isTaskAvailable = await SubTask.findOne({ _id: req.params.id })

        if (!isTaskAvailable) {
            return res.status(404).json({ error: true, message: "No SubTask Found" })
        }

        let task = await SubTask.deleteOne({ _id: req.params.id });
        return res.status(200).json({ error: false, message: "SubTask Deleted Successfully", data: task })
    }
    catch (err) {
        next(err)
    }
}




module.exports = {
    addsubTask,
    getasubAllTask,
    getsubSingleTask,
    updatesubTask,
    deletesubTask,

}