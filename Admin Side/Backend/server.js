const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const logger = require('./logger'); // Import winston logger
const morgan = require('morgan');   // Morgan for HTTP request logging

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Log access requests with morgan using winston's logger
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())  // Send access logs to combined log via winston
    }
}));

// MongoDB connection logging
const MONGODB_URL = process.env.MONGODB_URL;
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on("error", (err) => {
    logger.error(`MongoDB Connection Error: ${err}`);
});

connection.once("open", () => {
    logger.info("Mongodb Connection Success!");
});

// Route imports
const studentRouter = require("./routes/studentroutes.js");
app.use("/student", studentRouter);

const staffRouter = require("./routes/staff.js");
app.use("/staff", staffRouter);

const teacherRouter = require("./routes/teacher.js");
app.use("/teacher", teacherRouter);

const adminRoutes = require("./routes/adminroutes");
app.use("/admin", adminRoutes);

const inventory = require("./routes/inventory_route");
app.use("/api/inventory", inventory);
app.use("/api/content", express.static(path.join(__dirname, "./images")));

const paymentRouter = require("./routes/Payments.js");
app.use("/payment", paymentRouter);

const courseRouter = require("./routes/Courses.js");
app.use("/course", courseRouter);

const announcementRouter = require("./routes/announcements.js");
app.use("/announcement", announcementRouter);

const hallRouter = require("./routes/hall.js");
app.use("/hall", hallRouter);

const classRouter = require("./routes/class.js");
app.use("/class", classRouter);

// Global error handler for logging all route errors
app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message} | Route: ${req.originalUrl} | Method: ${req.method} | Status: ${err.status || 500}`);
    res.status(err.status || 500).json({
        error: err.message || "An unknown error occurred"
    });
});

app.listen(PORT, () => {
    logger.info(`Server is up and running on port number: ${PORT}`);
});
