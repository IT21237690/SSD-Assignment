const router = require("express").Router();

let Hall = require("../models/hall");

router.route("/add").post((req,res)=>{
    
    const classname = req.body.classname;
    const hallname = req.body.hallname;
    const location = req.body.location;

    const newHall = new Hall({

        
        classname,
        hallname,
        location
    })

    newHall.save().then(()=>{
        res.json("Hall Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    Hall.find().then((hall)=>{
        res.json(hall)
    }).catch((err)=>{
        console.log(err)
    })

})

router.route("/update/:id").put(async (req,res) =>{
    let userId = req.params.id;
    const {classname,hallname,location } = req.body;

    const updateHall = {
       
        classname,
        hallname,
        location
    }

    const update = await Hall.findByIdAndUpdate(userId,updateHall)
    .then(() => {
        res.status(200).send({status: "User updated", user: update})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message});

    })

})


router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;
  
    await Hall.findByIdAndDelete(userId)
    .then(() => {
      res.status(200).send({status: "User deleted"});
    }).catch((err) =>{
       console.log(err.message);
       res.status(500).send({status: "Error with delete user", error: err.message});
    })
  })


  router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await Hall.findById(userId)
    .then(() => {
       res.status(200).send({status: "User fetched", user: user})

    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message});
    })
})




module.exports= router;
