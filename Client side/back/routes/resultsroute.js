const router = require("express").Router();
let Results = require("../models/Results");
const PDFDocument = require("pdfkit-table");
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const data = fs.readFileSync(file.path, 'utf-8');
  const lines = data.split('\n');
  const subject = lines[0].trim(); // assuming the subject name is on the first line

  const students = lines.slice(1).map(line => {
    const [name, marks] = line.split(',');
    return { name, marks, subject };
  });

  Results.insertMany(students)
    .then(() => {
      fs.unlinkSync(file.path);
      res.json({ message: 'File uploaded successfully.' });
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ message: 'There was an error uploading the file.' });
    });
});

router.get('/student/results/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const results = await Results.find({ name }); // Retrieve all results for the given name
    res.send({ results });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});


  

module.exports = router;



