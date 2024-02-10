let express =require("express")
const { addTask, getAllTask, getSingleTask, updateTask, deleteTask, getonetask} =require("../controller/task.controller")
const {auth} =require("../middalware/authMiddalware")

let router = express.Router()


router.post("/addtask" ,auth,addTask);
router.get("/tasks",auth ,getAllTask);
router.get("/task/:id",auth,getSingleTask);
router.put("/updatetask/:id",auth,updateTask);
router.delete("/deletetask/:id",auth,deleteTask);  
router.get("/getone",auth, getonetask)

module.exports= router;