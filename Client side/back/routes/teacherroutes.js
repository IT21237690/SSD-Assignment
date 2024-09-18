// import necessary modules
const bcrypt = require('bcryptjs');
const { Router } = require('express');
const teacherdb = require('../models/teacherSchema');
const teacherauth = require("../middleware/teacherauthentication");

// create a new router instance
const router = Router();




router.post("/forgot-password", async (req, res) => {
  const { email, answer, password } = req.body;

  const userEmail = email;

  try {
    const teacher = await teacherdb.findOne({ email: userEmail });
    if (!teacher) {
      return res.json({ message: "Teacher not found" });
    }

    const { securityQuestion, securityAnswer } = teacher;

    if (!securityQuestion) {
      return res.json({ message: "Security question is not set for this teacher" });
    }

    if (!answer) {
      return res.json({ question: securityQuestion });
    }

    const isAnswerCorrect = (answer === teacher.securityAnswer)

    if (!isAnswerCorrect) {
      return res.json({ message: "Incorrect security answer" });
    }

    teacher.password = password;
    await teacher.save();

    console.log("Password updated successfully");
    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.json({ message: "Internal server error" });
  }
});




router.post("/registerteacher", async (req, res) => {

  const { name,nic,address,age,gender,land,mobile,email,workPlace,subject,password,securityAnswer } = req.body;
        

  try {

      const preuser = await teacherdb.findOne({ email: email });

      if (preuser) {
          return res.status(422).json({ error: "This Email is Already Exist" })
      } else {

       
          const finalUser = new teacherdb({
            name,nic,address,age,gender,land,mobile,email,workPlace,subject,password,securityAnswer
          });

         

          // here password hasing

          const storeData = await finalUser.save();

          // console.log(storeData);
         return res.status(201).json({ status: 201, storeData })
      }

  } catch (error) {
    console.log(error);
     return res.status(424).json(error);
      
  }

});



router.post("/Tlogin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Please fill all the details" });
  }

  try {
    const userValid = await teacherdb.findOne({ email });

    if (!userValid.isAdminApproved) {
      return res.status(420).json({ status: 420})
    }

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);


  
      if (!isMatch) {
        console.log(!isMatch)
        return res.status(421).json({ error: "Invalid email or password" });
        

      }
  
      const token = await userValid.generateAuthtoken();
  
      res.cookie("usercookie", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });

      const result = {
        userValid,
        token,
      };

      return res.status(201).json({ status: 201, result });
    }

    return res.status(422).json({ error: "Invalid email or password" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
});


router.get("/validteacher",teacherauth,async(req,res)=>{
  try {
      const Validteacher = await teacherdb.findOne({_id:req.userId});
      res.status(201).json({status:201,Validteacher});
  } catch (error) {
      res.status(401).json({status:401,error});
  }
});

router.get("/getteacher/:id",teacherauth,async(req,res)=>{
  try {
      const Validteacher = await teacherdb.findOne({_id:req.userId});
      res.status(201).json({status:201,Validteacher});
      console.log(req.params);
      const {id} = req.params;

      const userindividual = await teacherdb.findById({_id:id});
      console.log(userindividual);
      res.status(201).json(userindividual)

  } catch (error) {
      res.status(422).json(error);
  }
});

router.get("/Tlogout",teacherauth,async(req,res)=>{
  try {
      req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
          return curelem.token !== req.token
      });

      res.clearCookie("usercookie",{path:"/"});

      req.rootUser.save();

      res.status(201).json({status:201})

  } catch (error) {
      res.status(401).json({status:401,error})
  }
});







module.exports = router;


