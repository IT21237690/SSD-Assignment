const router = require("express").Router();
let course = require("../models/CoursesModel");
const PDFDocument = require("pdfkit-table");
const { body, param, validationResult } = require('express-validator');

// Create course with validation and sanitization
router.route("/add").post([
  body('courseID').isString().trim().escape().notEmpty().withMessage('Course ID is required'),
  body('courseName').isString().trim().escape().notEmpty().withMessage('Course Name is required'),
  body('teacherName').isString().trim().escape().notEmpty().withMessage('Teacher Name is required'),
  body('grade').isNumeric().withMessage('Grade must be a number'),
  body('startingTime').isString().trim().escape().notEmpty().withMessage('Starting Time is required'),
  body('date').isString().trim().escape().notEmpty().withMessage('Date is required'),
  body('timeDuration').isNumeric().withMessage('Time Duration must be a number'),
  body('fee').isNumeric().withMessage('Fee must be a number'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { courseID, courseName, teacherName, grade, startingTime, date, timeDuration, fee } = req.body;

  const newCourse = new course({
    courseID,
    courseName,
    teacherName,
    grade,
    startingTime,
    date,
    timeDuration,
    fee
  });

  newCourse.save().then(() => {
    res.json("Course Added");
  }).catch((err) => {
    console.log(err);
    res.status(500).send("Error adding course");
  });
});

// Report 
router.get("/reporting", async (_req, res, next) => {
  try {
    const courses = await course.find({}).sort({ CreatedAt: -1 });
    // Start PDF document
    let doc = new PDFDocument({ margin: 30, size: "A4" });
    // Simple Table with Array
    if (!courses.length) {
      const error = new Error("No Courses exists");
      error.status = 404;
      throw error;
    }
    const headers = [
      "Course ID",
      "Course Name",
      "Teacher's Name",
      "Grade",
      "Starting Time",
      "Date",
      "Time Duration",
      "Fee",
    ];
    const rows = courses.map(i => [
      i.courseID,
      i.courseName,
      i.teacherName,
      i.grade,
      i.startingTime,
      i.date,
      i.timeDuration,
      i.fee,
    ]);

    const tableArray = {
      headers: headers,
      rows: rows,
    };
    doc.table(tableArray, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (_row, indexColumn, indexRow, rectRow) => {
        doc.font("Helvetica").fontSize(8);
        indexColumn === 0 && doc.addBackground(rectRow, indexRow % 2 ? "blue" : "green", 0.15);
      },
    });

    // Create a buffer from the PDF document
    let chunks = [];
    doc.on('data', (chunk) => {
      chunks.push(chunk);
    });
    doc.on('end', () => {
      const pdfBlob = Buffer.concat(chunks);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="myfile.pdf"');
      res.send(pdfBlob);
    });
    // Done
    doc.end();
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// Get details about all courses
router.route("/").get((req, res) => {
  course.find().then((courses) => {
    res.json(courses);
  }).catch((err) => {
    console.log(err);
    res.status(500).send("Error fetching courses");
  });
});

// Get details about one course with validation
router.get("/:id", [
  param('id').isMongoId().withMessage('Invalid Course ID format')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let id = req.params.id;
    let details = await course.findById(id);
    if (!details) {
      const error = new Error("Course not found");
      error.status = 404;
      throw error;
    }
    res.json(details);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with getting details", error: err.message });
  }
});

// Search function with validation
router.route("/search/:id").get([
  param('id').isString().trim().escape().notEmpty().withMessage('Course ID is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const query = req.params.id;
  course.findOne({ courseID: query }, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error searching for result');
    } else {
      res.json(results);
    }
  });
});

// Update course with validation
router.route("/update/:id").put([
  param('id').isMongoId().withMessage('Invalid Course ID format'),
  body('courseID').isString().trim().escape().notEmpty().withMessage('Course ID is required'),
  body('courseName').isString().trim().escape().notEmpty().withMessage('Course Name is required'),
  body('teacherName').isString().trim().escape().notEmpty().withMessage('Teacher Name is required'),
  body('grade').isNumeric().withMessage('Grade must be a number'),
  body('startingTime').isString().trim().escape().notEmpty().withMessage('Starting Time is required'),
  body('date').isString().trim().escape().notEmpty().withMessage('Date is required'),
  body('timeDuration').isNumeric().withMessage('Time Duration must be a number'),
  body('fee').isNumeric().withMessage('Fee must be a number'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let id = req.params.id;
  const { courseID, courseName, teacherName, grade, startingTime, date, timeDuration, fee } = req.body;

  const updateCourse = {
    courseID,
    courseName,
    teacherName,
    grade,
    startingTime,
    date,
    timeDuration,
    fee
  };

  await course.findByIdAndUpdate(id, updateCourse).then(() => {
    res.status(200).send({ status: "Course Details updated" });
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ status: "Error with updating details" });
  });
});

// Delete course with validation
router.route("/delete/:id").delete([
  param('id').isMongoId().withMessage('Invalid Course ID format')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let courseID = req.params.id;

  await course.findOneAndDelete({ _id: courseID }).then(() => {
    res.status(200).send({ status: "Course deleted" });
  }).catch((err) => {
    console.log(err.message);
    res.status(500).send({ status: "Error with deleting course details", error: err.message });
  });
});

module.exports = router;
