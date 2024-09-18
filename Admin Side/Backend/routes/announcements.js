const router = require("express").Router();
const notice = require("../models/notice");
const PDFDocument = require("pdfkit-table");


router.route("/add").post((req, res)=>{
    const message = req.body.message;
    const mid = req.body.mid;
    const date = req.body.date;
    const time = req.body.time;
    const from = req.body.from;
    const to = req.body.to;

    const newNotice = new notice({
        message,
        mid,
        date,
        time,
        from,
        to
    });

    // Create function
    newNotice.save().then(() =>{
        res.json("Message added");
    }).catch((err)=>{
        console.log(err);
    });
});

// Retrieve function
router.route("/").get((req,res) =>{
    notice.find().then((notices)=>{
        res.json(notices);
    }).catch((err)=>{
        console.log(err);
    });
});

// Update function
router.route("/update/:id").put(async (req,res)=>{
    let id = req.params.id;
    const {message, mid, date, time, from, to} = req.body; // destructuring

    const updateMessage = {
        message,
        mid,
        date,
        time,
        from,
        to
    };

    try {
        const update = await notice.findByIdAndUpdate(id, updateMessage);
        res.status(200).send({status: "Message updated"});
    } catch (err) {
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    }
});

// Delete function
router.route("/delete/:id").delete(async (req,res)=>{
    let id = req.params.id;

    try {
        await notice.findByIdAndDelete(id);
        res.status(200).send({status: "Message deleted"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with deletion"});
    }
});

router.get("/get/:id",async (req, res) => {
    let id = req.params.id;
    try {
        const noticeObj = await notice.findById(id);
        return res.status(200).send({status: "fetched"});
    } catch (err) {
        console.log(err.message);
        res.status(500).send({status: "Error with get notice"});
    }
});

//report generation function
router.get("/report", async (_req, res, next) => {
    try {
      const noticespdf = await notice.find({}).sort({ CreatedAt: -1 });
      
      let doc = new PDFDocument({ margin: 30, size: "A4" });
  
  
      if (!noticespdf.length) {
        const error = new Error("No notices available here");
        error.status = 404;
        throw error;
      }
      const headers = [
        "Message",
        "Message ID",
        "Date",
        "Time",
        "Sender",
        "Audience",
      ];
      const rows = [];
      noticespdf.map((a) => {
        rows.push([
          a.message,
          a.mid,
          a.date,
          a.time,
          a.from,
          a.to,
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
      // creating PDF document
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
  
  
      
      doc.end();
    } catch (err) {
      console.error(err.message);
      next(err);
    }
  });

module.exports = router;

