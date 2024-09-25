const routerTeacher = require("express").Router();
const multer = require("multer");
let Teacher = require("../models/Teacher");


routerTeacher.route("/addT").post((req,res)=>{

    const name = req.body.name;
    const nic = req.body.nic;
    const address = req.body.address;
    const age = req.body.age;
    const gender = req.body.gender;
    const land = req.body.land;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const workPlace = req.body.workPlace;
    const subject = req.body.subject;
    const password = req.body.password;
  

    const newTeacher = new Teacher({
        name,
        nic,
        address,
        age,
        gender,
        land,
        mobile,
        email,
        workPlace,
        subject,
        password,
        
    })

    newTeacher.save().then(()=>{
        res.json("Staff member added successfully!")
    }).catch((err)=>{
        console.log(err);
    })
})

routerTeacher.route("/T").get((req,res)=>{
    Teacher.find().then((teacher)=>{
        res.json(teacher)
    }).catch((err)=>{
        console.log(err)
    })
})


routerTeacher.route("/updateT/:id").put( async (req,res)=>{
    let userId = req.params.id;
    const {name,nic,address,age,gender,land,mobile,email,workPlace,subject,password} = req.body;

    const updateTeacher = {
        name,
        nic,
        address,
        age,
        gender,
        land,
        mobile,
        email,
        workPlace,
        subject,
        password,
       
    }

    const update = await Teacher.findByIdAndUpdate(userId, updateTeacher)
    .then(()=>{
       return res.json("Teacher updated successfully!")
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status: "Error with updating data",error: err.message})
})   
})


routerTeacher.route("/deleteT/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await Teacher.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted successfully"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Error in deleting!", user: update})
    })
})

routerTeacher.get("/getT/:id", async(req,res)=>{
   try {
    let userId = req.params.id;
    let teacher = await Teacher.findById(userId);
    if (!teacher) {
      const error = new Error("teacher not found");
      error.status = 404;
      throw error;
    }
   return res.json(teacher);
  } catch (err) {
    console.log(err.message);
   return res.status(500).send({ status: "Error in fetching user", error: err.message });
  }
});



module.exports = routerTeacher;