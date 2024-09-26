const router = require("express").Router();
let Results = require("../models/Results");
const PDFDocument = require("pdfkit-table");
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

const rateLimit = require("express-rate-limit");

// Define a rate limit rule
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute in milliseconds
  max: 5, // 5 requests per IP per 1 min
  message: "Too many requests from this IP, please try again later.",
});

router.post("/upload", upload.single("file"), limiter, (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  const data = fs.readFileSync(file.path, "utf-8");
  const lines = data.split("\n");
  const subject = lines[0].trim(); // assuming the subject name is on the first line

  const students = lines.slice(1).map((line) => {
    const [name, marks] = line.split(",");
    return { name, marks, subject };
  });

  Results.insertMany(students)
    .then(() => {
      fs.unlinkSync(file.path);
      res.json({ message: "File uploaded successfully." });
    })
    .catch((err) => {
      console.error("Error:", err);
      res
        .status(500)
        .json({ message: "There was an error uploading the file." });
    });
});

router.get("/student/results/:name", limiter, async (req, res) => {
  try {
    const name = req.params.name;
    const results = await Results.find({ name }); // Retrieve all results for the given name
    res.send({ results });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
