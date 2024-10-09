const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
let Staff = require("../models/Staff");
const PDFDocument = require("pdfkit-table");
const rateLimit = require("express-rate-limit");


// Define a rate limit rule
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute in milliseconds
  max: 2, // 2 req per IP per 1 min
  message: "Too many requests from this IP, please try again later."
});

// Validation and Sanitization rules
const staffValidationRules = [
  check("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  check("nic").trim().notEmpty().withMessage("NIC is required").isLength({ min: 10, max: 12 }).withMessage("NIC must be between 10 to 12 characters"),
  check("address").trim().notEmpty().withMessage("Address is required"),
  check("age").isInt({ min: 18 }).withMessage("Age must be an integer and at least 18"),
  check("gender").isIn(["Male", "Female", "Other"]).withMessage("Gender must be Male, Female, or Other"),
  check("land").optional().trim().isLength({ min: 9, max: 15 }).withMessage("Land number must be between 9 to 15 characters"),
  check("mobile").trim().notEmpty().withMessage("Mobile number is required").isMobilePhone().withMessage("Invalid mobile number"),
  check("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email address"),
  check("category").trim().notEmpty().withMessage("Category is required"),
];

// Route to add new staff
router.route("/add").post(staffValidationRules,limiter, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, nic, address, age, gender, land, mobile, email, category } = req.body;

  const newStaff = new Staff({
    name,
    nic,
    address,
    age,
    gender,
    land,
    mobile,
    email,
    category,
  });

  newStaff.save().then(() => {
    res.json("Staff member added successfully!");
  }).catch((err) => {
    console.error("Error in adding staff member:", err);
    res.status(500).json({ error: "Error in adding staff member" });
  });
});

// Route to get all staff members
router.route("/get").get(limiter,(req, res) => {
  Staff.find().then((staff) => {
    res.json(staff);
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: "Error in fetching staff" });
  });
});

// Route to update staff member
router.route("/update/:id").put(staffValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let userId = req.params.id;
  const { name, nic, address, age, gender, land, mobile, email, category } = req.body;

  const updateStaff = {
    name,
    nic,
    address,
    age,
    gender,
    land,
    mobile,
    email,
    category,
  };

  await Staff.findByIdAndUpdate(userId, updateStaff)
    .then(() => {
      res.json("Staff member updated successfully!");
    }).catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data", error: err.message });
    });
});

// Route to delete staff member
router.route("/delete/:id").delete(async (req, res) => {
  let userId = req.params.id;

  await Staff.findByIdAndDelete(userId).then(() => {
    res.status(200).send({ status: "User deleted successfully" });
  }).catch((err) => {
    console.log(err.message);
    res.status(500).send({ status: "Error in deleting!", error: err.message });
  });
});

// Route to get staff member by ID
router.get("/get/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    let staff = await Staff.findById(userId);
    if (!staff) {
      const error = new Error("Staff member not found");
      error.status = 404;
      throw error;
    }
    res.json(staff);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error in fetching user", error: err.message });
  }
});

// Route to generate PDF report for staff
router.get("/reportstaff",limiter, async (_req, res, next) => {
  try {
    const staff = await Staff.find({}).sort({ CreatedAt: -1 });
    // start pdf document
    let doc = new PDFDocument({ margin: 30, size: "A4" });

    // -----------------------------------------------------------------------------------------------------
    // Simple Table with Array
    // -----------------------------------------------------------------------------------------------------
    if (!staff.length) {
      const error = new Error("No Staff member exists");
      error.status = 404;
      throw error;
    }
    const headers = [
      "Name",
      "Email",
      "NIC",
      "Category",
      "Address",
    ];
    const rows = [];
    staff.map((sf) => {
      rows.push([
        sf.name,
        sf.email,
        sf.nic,
        sf.category,
        sf.address,
      ]);
    });
    const tableArray = {
      headers: headers,
      rows: rows,
    };
    doc.table(tableArray, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (_row, indexColumn, indexRow, rectRow) => {
        doc.font("Helvetica").fontSize(8);
        indexColumn === 0 &&
          doc.addBackground(rectRow, indexRow % 2 ? "blue" : "green", 0.15);
      },
    });

    // create a buffer from the PDF document
    let chunks = [];
    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });
    doc.on('end', () => {
      const pdfBlob = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="StaffDetails.pdf"');
      res.send(pdfBlob);
    });

    // done
    doc.end();
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
