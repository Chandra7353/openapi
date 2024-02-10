let Task = require("../models/task.models")
const jwt = require('jsonwebtoken')
const makecalls = require("../middalware/makevoicecall")


let addTask = async (req, res, next) => {
    try {
        let { userid, title, duedate, description, status, priority } = req.body;
        userid = req.user._id;

        let task = await Task.create({ userid, title, duedate, description, status, priority });

        if (task) {
            let tokengenerator = jwt.sign({
                title: task.title,
                duedate: task.duedate,
                priority: task.priority,
                description: task.description,
                status: task.status,
                _id: task._id
            }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRESIN });

            return res.status(201).json({ error: false, message: "Task Added Successfully", data: tokengenerator, task });
        }
        return res.status(500).json({ error: false, message: "Invalid task", data: task });
    } catch (err) {
        next(err);
    }
}


let getAllTask = async (req, res, next) => {
    try {


        let tasks = await Task.find({});
        if (!tasks.length) {
            return res.status(404).json({ error: true, message: "No Task Available", data: tasks });
        }

        return res.status(200).json({ error: false, message: "Tasks fetched Successfully", data: tasks });
    } catch (err) {
        next(err);
    }
}




let getSingleTask = async (req, res, next) => {
    try {


        let task = await Task.findOne({ _id: req.params.id });

        if (task) {
            return res.status(200).json({ error: false, message: "Task Fetched Successfully", data: task })
        }
        return res.status(404).json({ error: true, message: "No Task Found" })
    }
    catch (err) {
        next(err)
    }
}


let updateTask = async (req, res, next) => {
    try {
        let isTaskAvailable = await Task.findOne({ _id: req.params.id });

        if (!isTaskAvailable) {
            return res.status(404).json({ error: true, message: "No Task Found" });
        }


        let task = await Task.findOneAndUpdate({ _id: req.params.id }, { $set: { status: "DONE", ...req.body } }, { new: true, runValidators: true });
        console.log(task);
        return res.status(200).json({ error: false, message: "Task Updated Successfully", data: task });
    } catch (err) {
        next(err);
    }
}


let deleteTask = async (req, res, next) => {
    try {
        let isTaskAvailable = await Task.findOne({ _id: req.params.id })

        if (!isTaskAvailable) {
            return res.status(404).json({ error: true, message: "No Task Found" })
        }

        let task = await Task.deleteOne({ _id: req.params.id });
        return res.status(200).json({ error: false, message: "Task Deleted Successfully", data: task })
    }
    catch (err) {
        next(err)
    }
}

const getonetask = async (req, res, next) => {
    try {
        let { priority, dueDate, page, limit } = req.query;
        let query = {};

        if (priority) {
            query.priority = priority;
        }

      
        if (dueDate) {
            query.due_date = { $gte: new Date(dueDate) };
        }


        page = parseInt(page) || 1;
        limit = parseInt(limit) || 7;
        const skip = (page - 1) * limit;

      
        const tasks = await Task.find(query).skip(skip).limit(limit);

        if (tasks.length === 0) {
            return res.status(404).json({ error: true, message: "No tasks found with the provided filters" });
        }

        return res.status(200).json({ error: false, message: "Tasks fetched successfully", data: tasks });
    } catch (error) {
        next(error);
    }
};






module.exports = {
    addTask,
    getAllTask,
    getSingleTask,
    updateTask,
    deleteTask,
    getonetask

}