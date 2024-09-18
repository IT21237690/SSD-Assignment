const router = require("express").Router();
let course = require("../models/CoursesModel");
const PDFDocument = require("pdfkit-table");

//create
router.route("/add").post((req, res) => {
  const courseID = req.body.courseID;
  const courseName = req.body.courseName;
  const teacherName = req.body.teacherName;
  const grade = Number(req.body.grade);
  const startingTime = req.body.startingTime;
  const date = req.body.date;
  const timeDuration = Number(req.body.timeDuration);
  const fee = Number(req.body.fee);

  const newCourse = new course({
    courseID,
    courseName,
    teacherName,
    grade,
    startingTime,
    date,
    timeDuration,
    fee
  })

  newCourse.save().then(() => {
    res.json("Course Added")
  }).catch((err) => {
    console.log(err);
  })
})

//report 
router.get("/reporting", async (_req, res, next) => {
  try {
    const courses = await course.find({}).sort({ CreatedAt: -1 });
    // start pdf document
    let doc = new PDFDocument({ margin: 30, size: "A4" });
    // Simple Table with Array
    if (!courses.length) {
      const error = new Error("No Inventoris exists");
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
    const rows = [];
    courses.map((i) => {
      rows.push([
        i.courseID,
        i.courseName,
        i.teacherName,
        i.grade,
        i.startingTime,
        i.date,
        i.timeDuration,
        i.fee,
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
      res.setHeader('Content-Disposition', 'attachment; filename="myfile.pdf"');
      res.send(pdfBlob);
    });
    // done
    doc.end();
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});


//get details about all
router.route("/").get((req, res) => {
  course.find().then((course) => {
    res.json(course)
  }).catch((err) => {
    console.log(err)
  })
})

//get details about one
router.get("/:id", async (req, res) => {
  let id = req.params.id;

  const details = await course.findById(id)
    .then((details) => {
     return res.status(200).send({ status: "details fetched"})
    }).catch((err) => {
      console.log(err.message);
      res.status(500).send({ status: "Error with get details", error: err.message });
    })

})

//get details about one part 02
router.get("/get/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;

    const courseSingle = await course.findOne({ courseID: id });
    console.log(courseSingle);
    return res.status(201).json(courseSingle)

  } catch (error) {
    res.status(404).json(error)
  }
})


//search function
router.route("/search/:id").get(async (req, res) => {
  const query = req.params.q;
  course.findOne({ courseID: { courseId: query } }, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error searching for result');
    } else {
      res.json(results);
    }
  });
});


//update
router.route("/update/:id").put(async (req, res) => {
  let cID = req.params.courseID
  const { courseID, courseName, teacherName, grade, startingTime, date, timeDuration, fee } = req.body

  const updateCourse = {
    courseID,
    courseName,
    teacherName,
    grade,
    startingTime,
    date,
    timeDuration,
    fee
  }

  const update = await course.findOneAndUpdate(cID, updateCourse).then(() => {
    res.status(200).send({ status: "Course Details updated" })
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ status: "Error with updating details" });
  })
})

//delete
router.route("/delete/:id").delete(async (req, res) => {
  let courseID = req.params.courseID;

  await course.findOneAndDelete(courseID).then(() => {
    res.status(200).send({ status: "Course deleted" });
  }).catch((err) => {
    console.log(err.message);
    res.status(500).send({ status: "Error with delete course details", error: err.message });
  })
})

module.exports = router;