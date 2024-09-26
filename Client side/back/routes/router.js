const express = require("express");
const router = express.Router();
const studentdb = require("../models/userSchema");
var bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");
const Results = require("../models/Results");
const QRCode = require("qrcode");
const moment = require("moment");
const qr = require("qr-image");
const dotenv = require("dotenv");
const { body, param, query, validationResult } = require("express-validator");
const keysecret = process.env.SECRET_KEY;
const rateLimit = require("express-rate-limit");

// Define a rate limit rule
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute in milliseconds
  max: 5, // 5 requests per IP per 1 min
  message: "Too many requests from this IP, please try again later.",
});

// Utility function to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

// User Registration
router.post(
  "/register",
  [
    limiter,
    // Validation rules
    body("name").notEmpty().withMessage("Name is required").trim().escape(),
    body("address").notEmpty().withMessage("Address is required").trim().escape(),
    body("mobile")
      .isMobilePhone()
      .withMessage("Invalid mobile number")
      .notEmpty()
      .withMessage("Mobile is required"),
    body("gender").notEmpty().withMessage("Gender is required").trim().escape(),
    body("dob").isDate().withMessage("Date of Birth is required").toDate(),
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("securityAnswer").notEmpty().withMessage("Security answer is required").trim().escape(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("cpassword")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Passwords do not match"),
  ],
  handleValidationErrors,
  async (req, res) => {
    const {
      name,
      address,
      mobile,
      gender,
      dob,
      email,
      securityAnswer,
      password,
    } = req.body;

    try {
      const preuser = await studentdb.findOne({ email: email });
      if (preuser) {
        return res.status(422).json({ error: "This email is already registered" });
      }

      // Generate a unique SID for the new student
      const year = moment().format("YYYY");
      const month = moment().format("MM");
      const sid = `${year}${month}${Math.random().toString().substr(2, 8)}`;

      // Generate a QR code with the student's email and name
      const qrCodeData = { email, name };
      const qrCodeOptions = { type: "image/jpeg", quality: 0.3, margin: 1 };
      const qrCode = await QRCode.toDataURL(JSON.stringify(qrCodeData), qrCodeOptions);

      // Create a new student object
      const finalUser = new studentdb({
        sid,
        name,
        address,
        mobile,
        gender,
        dob,
        email,
        securityAnswer,
        password,
        qrCode,
      });

      // Save the new student
      const storeData = await finalUser.save();
      return res.status(201).json({ status: 201, storeData });
    } catch (error) {
      console.log("Error occurred:", error);
      return res.status(500).json({ error: error.message });
    }
  }
);

// Forgot Password
router.post(
  "/forgot-password",
  [
    limiter,
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("answer").notEmpty().withMessage("Security answer is required").trim().escape(),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .optional(),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { email, answer, password } = req.body;

    try {
      const student = await studentdb.findOne({ email });
      if (!student) {
        return res.json({ message: "Student not found" });
      }

      if (!answer) {
        return res.json({ question: student.securityQuestion });
      }

      const isAnswerCorrect = answer === student.securityAnswer;
      if (!isAnswerCorrect) {
        return res.json({ message: "Incorrect security answer" });
      }

      student.password = password;
      await student.save();
      return res.json({ message: "Password updated successfully" });
    } catch (err) {
      console.error(err);
      return res.json({ message: "Internal server error" });
    }
  }
);

// Retrieve Student QR Code by Email
router.get(
  "/student/:email/qrcode",
  [limiter, param("email").isEmail().withMessage("Invalid email").normalizeEmail()],
  handleValidationErrors,
  async (req, res) => {
    const email = req.params.email;
    try {
      const user = await studentdb.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const qrCodeData = { email: user.email, name: user.name };
      const qrCodeSize = 10;
      const qrCode = qr.image(JSON.stringify(qrCodeData), { size: qrCodeSize });
      res.type("png");
      qrCode.pipe(res);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// User Login
router.post(
  "/login",
  [
    limiter,
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  handleValidationErrors,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const userValid = await studentdb.findOne({ email });

      if (userValid) {
        const isMatch = await bcrypt.compare(password, userValid.password);
        if (!isMatch) {
          return res.status(422).json({ error: "Invalid details" });
        }

        const token = await userValid.generateAuthtoken();
        res.cookie("usercookie", token, { expires: new Date(Date.now() + 9000000), httpOnly: true });

        const result = { userValid, token };
        return res.status(201).json({ status: 201, result });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(401).json(error);
    }
  }
);

// Get User by Email
router.get(
  "/getuser/:id",
  [
    authenticate,
    limiter,
    param("id").isMongoId().withMessage("Invalid user ID"),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const user = await studentdb.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(201).json(user);
    } catch (error) {
      return res.status(422).json({ error });
    }
  }
);

// Update User by Email
router.patch(
  "/updateuser/:email",
  [
    limiter,
    param("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const updatedUser = await studentdb.findOneAndUpdate(
        { email: req.params.email },
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(201).json(updatedUser);
    } catch (error) {
      return res.status(422).json(error);
    }
  }
);

// Get Results by Name
router.get(
  "/results/:name",
  [
    limiter,
    param("name").notEmpty().withMessage("Name is required").trim().escape(),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const result = await Results.findOne({ name: req.params.name });
      if (!result) {
        return res.status(404).json({ error: "Results not found" });
      }
      return res.json(result);
    } catch (err) {
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
