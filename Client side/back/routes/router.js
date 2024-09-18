const express = require("express");
const router = express.Router();
const studentdb = require("../models/userSchema");

var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const Results = require('../models/Results');
const QRCode = require('qrcode');
const moment = require('moment');
const qr = require('qr-image');
const dotenv = require("dotenv");

const keysecret = process.env.SECRET_KEY




// for user registration

router.post('/register', async (req, res) => {
    const {
      name, address, mobile, gender, dob, email,securityAnswer, password, cpassword
    } = req.body;
  
    try {
      const preuser = await studentdb.findOne({ email: email });
  
      if (preuser) {
       return res.status(422).json({ error: 'This email is already registered' });
      } else if (password !== cpassword) {
        
        return res.status(420).json({ error: 'Password and confirm password do not match' });
      } else {
        // Generate a unique SID for the new student
        const year = moment().format('YYYY');
        const month = moment().format('MM');
        const sid = `${year}${month}${Math.random().toString().substr(2, 8)}`;
  
        // Generate a QR code with the student's email and name
        const qrCodeData = {
          email: email,
          name: name,
        };
        const qrCodeOptions = {
          type: 'image/jpeg',
          quality: 0.3,
          margin: 1,
        };
        const qrCode = await QRCode.toDataURL(JSON.stringify(qrCodeData), qrCodeOptions);
  
        // Create a new student object with the given data
        const finalUser = new studentdb({
          sid: sid,
          name: name,
          address: address,
          mobile: mobile,
          gender: gender,
          dob: dob,
          email: email,
          securityAnswer:securityAnswer,
          password: password,
          cpassword : cpassword,
          qrCode: qrCode,
        });
  
        // Save the new student to the database
        const storeData = await finalUser.save();
        
  
        return res.status(201).json({ status: 201, storeData });
      }
    } catch (error) {
      console.log('Error occurred:', error);
      return res.status(500).json({ error: error.message });
    }
  });


  router.post("/forgot-password", async (req, res) => {
    const { email, answer, password } = req.body;
  
    const userEmail = email;
  
    try {
      const student = await studentdb.findOne({ email: userEmail });
      if (!student) {
        return res.json({ message: "student not found" });
      }
  
      const { securityQuestion, securityAnswer } = student;
  
      if (!securityQuestion) {
        return res.json({ message: "Security question is not set for this student" });
      }
  
      if (!answer) {
        return res.json({ question: securityQuestion });
      }
  
      const isAnswerCorrect = (answer === student.securityAnswer);
  
      if (!isAnswerCorrect) {
        return res.json({ message: "Incorrect security answer" });
      }
  
      student.password = password;
      await student.save();
  
      console.log("Password updated successfully");
      return res.json({ message: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      return res.json({ message: "Internal server error" });
    }
  });




router.get('/student/:email/qrcode', async (req, res) => {
  const email = req.params.email;
  try {
    const user = await studentdb.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const qrCodeData = {
      email: user.email,
      name: user.name,
    };
    const qrCodeSize = 10; // increase or decrease this value as needed
    const qrCode = qr.image(JSON.stringify(qrCodeData), { size: qrCodeSize });
    res.type('png');
    qrCode.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  
  

// user Login

router.post("/login", async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await studentdb.findOne({email:email});

        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);

            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
});






// user valid
router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await studentdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});





// user logout

router.get("/logout",authenticate,async(req,res)=>{
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

router.get("/getuser/:id",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await studentdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await studentdb.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
});

  


router.patch("/updateuser/:email",async(req,res)=>{
    try {
        const {email} = req.params.email;

        const updateduser = await users.findByIdAndUpdate(email,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
})

router.get('/results/:name', async (req, res) => {
    try {
      const name = req.params.name;
      const result = await Results.findOne({ name });
      res.json(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });



  


module.exports = router;






