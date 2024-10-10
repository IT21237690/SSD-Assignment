const router = require("express").Router();
let Results = require("../models/Results");
const PDFDocument = require("pdfkit-table");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const upload = multer({ dest: "uploads/" });

const rateLimit = require("express-rate-limit");

// Define a rate limit rule
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute in milliseconds
  max: 5, // 5 requests per IP per 1 min
  message: "Too many requests from this IP, please try again later.",
});

// Load VirusTotal API key from environment variables
const virusTotalApiKey = process.env.VIRUS_TOTAL_API_KEY;

// Helper function to scan file using VirusTotal API
const scanFileWithVirusTotal = async (filePath) => {
  const fileContent = fs.readFileSync(filePath);

  const formData = {
    file: fs.createReadStream(filePath),
  };

  try {
    const response = await axios.post("https://www.virustotal.com/api/v3/files", formData, {
      headers: {
        "x-apikey": virusTotalApiKey,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error scanning file with VirusTotal:", error);
    throw new Error("File scanning failed.");
  }
};

// File upload and scan route
router.post("/upload", upload.single("file"), limiter, async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    // Scan the file using VirusTotal before proceeding
    const virusTotalResponse = await scanFileWithVirusTotal(file.path);

    if (!virusTotalResponse) {
      return res.status(500).json({ message: "Virus scanning failed." });
    }

    console.log("VirusTotal scan result:", virusTotalResponse);

    if (virusTotalResponse.positives > 0) {
      // If any malware is detected, do not proceed with processing the file
      fs.unlinkSync(file.path); // Delete the file
      return res.status(400).json({
        message: `File contains malware. It was flagged by VirusTotal with ${virusTotalResponse.positives} positives.`,
      });
    }

    // Read and process the file if it's clean
    const data = fs.readFileSync(file.path, "utf-8");
    const lines = data.split("\n");
    const subject = lines[0].trim(); // Assuming the subject name is on the first line

    const students = lines.slice(1).map((line) => {
      const [name, marks] = line.split(",");
      return { name, marks, subject };
    });

    // Insert student results into the database
    await Results.insertMany(students);

    // Delete the file after successful upload
    fs.unlinkSync(file.path);

    res.json({ message: "File uploaded and scanned successfully." });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "There was an error uploading or scanning the file." });
  }
});

// Route to retrieve student results
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
