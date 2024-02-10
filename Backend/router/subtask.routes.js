let express =require("express")


const { addsubTask, getasubAllTask, updatesubTask, deletesubTask, getsubSingleTask } = require("../controller/subtask.controller");
const { subauth } = require("../middalware/authMiddalware");

let router = express.Router()


router.post("/addsubtask" ,subauth, addsubTask);
router.get("/subtasks",subauth ,getasubAllTask);
router.get("/subtask/:id",subauth,getsubSingleTask);
router.put("/updatesubtask/:id",subauth,updatesubTask);
router.delete("/deletesubtask/:id",subauth,deletesubTask);  


module.exports= router;