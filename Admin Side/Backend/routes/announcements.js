const router = require("express").Router();
const notice = require("../models/notice");
const PDFDocument = require("pdfkit-table");
const { body, param, validationResult } = require('express-validator');

// Middleware for validation and sanitization
const noticeValidationRules = [
    body('message').notEmpty().withMessage('Message is required.').isLength({ max: 255 }).withMessage('Message must be less than 255 characters.').trim().escape(),
    body('mid').notEmpty().withMessage('Mid is required.').isAlphanumeric().withMessage('Mid must be alphanumeric.').trim().escape(),
    body('date').notEmpty().withMessage('Date is required.').isISO8601().withMessage('Date must be in YYYY-MM-DD format.'),
    body('time').notEmpty().withMessage('Time is required.'),
    body('from').notEmpty().withMessage('From is required.').trim().escape(),
    body('to').notEmpty().withMessage('To is required.').trim().escape()
];

// Add route
router.route("/add").post(noticeValidationRules, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { message, mid, date, time, from, to } = req.body;

    const newNotice = new notice({
        message,
        mid,
        date,
        time,
        from,
        to
    });

    newNotice.save()
        .then(() => {
            res.json("Message added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with adding notice" });
        });
});

// Retrieve function
router.route("/").get((req, res) => {
    notice.find()
        .then((notices) => {
            res.json(notices);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with retrieving notices" });
        });
});

// Update function
router.route("/update/:id").put([
    param('id').isMongoId().withMessage('Invalid ID format.'),
    ...noticeValidationRules
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { message, mid, date, time, from, to } = req.body; // destructuring

    const updateMessage = {
        message,
        mid,
        date,
        time,
        from,
        to
    };

    try {
        await notice.findByIdAndUpdate(req.params.id, updateMessage);
        res.status(200).send({ status: "Message updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
    }
});

// Delete function
router.route("/delete/:id").delete(param('id').isMongoId().withMessage('Invalid ID format.'), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        await notice.findByIdAndDelete(req.params.id);
        res.status(200).send({ status: "Message deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deletion" });
    }
});

// Get notice by ID
router.get("/get/:id", param('id').isMongoId().withMessage('Invalid ID format.'), async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const noticeObj = await notice.findById(req.params.id);
        return res.status(200).send({ status: "fetched", data: noticeObj });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with getting notice" });
    }
});

// Report generation function
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

        // Creating PDF document
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
