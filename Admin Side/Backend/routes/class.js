const router = require("express").Router();

let Class = require("../models/class");

router.route("/add").post((req,res)=>{
    
    const subjectname = req.body.subjectname;
    const date = req.body.date;
    const time = req.body.time;
    const teacher = req.body.teacher;

    const newClass = new Class({

        
        subjectname,
        date,
        time,
        teacher,
    })

    newClass.save().then(()=>{
        res.json("Class Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Class.find().then((Class)=>{
        res.json(Class)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const {subjectname,date,time,teacher } = req.body;

    const updateClass = {
       
        subjectname,
        date,
        time,
        teacher,
    }

    const update = await Class.findByIdAndUpdate(userId,updateClass)
    .then(() => {
        res.status(200).send({status: "User updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message});

    })

})


router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;
  
    await Class.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({status: "User deleted"});
    }).catch((err) =>{
       console.log(err.message);
       res.status(500).send({status: "Error with delete user", error: err.message});
    })
  })


  router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await Class.findById(userId)
    .then(() => {
       res.status(200).send({status: "User fetched", user: user})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})




module.exports= router;
