require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const cookiParser = require("cookie-parser");
const dotenv = require("dotenv");
require("dotenv").config();
const port = 8009;

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


// app.get("/",(req,res)=>{
//     res.status(201).json("server created")
// });

app.use(express.json());
app.use(cookiParser());
app.use(cors(corsOptions));



const studentRouter = require("./routes/router");
app.use("/student",studentRouter);

const teacherRouter = require("./routes/teacherroutes");
app.use("/teacher",teacherRouter);

const adminRoutes = require("./routes/adminroutes");
app.use("/admin",adminRoutes);

const paymentRouter = require("./routes/Payments.js");
app.use("/payment",paymentRouter);
const courseRouter = require("./routes/Courses.js");
app.use("/course",courseRouter);

const ResultsRouter = require("./routes/resultsroute.js");
app.use("/results",ResultsRouter);








app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})