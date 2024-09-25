const router = require("express").Router();
const course = require("../models/CoursesModel");
let payment = require("../models/paymentModel");
const PDFDocument = require("pdfkit-table");

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const cardNumber = Number(req.body.cardNumber);
  const ExpYear = Number(req.body.ExpYear);
  const ExpMonth = Number(req.body.ExpMonth);
  const cvc = Number(req.body.cvc);
  const address = req.body.address;
  const email = req.body.email;
  const phone = Number(req.body.phone);
  const amount = Number(req.body.amount)

  const newPayment = new payment({
    name,
    cardNumber,
    ExpYear,
    ExpMonth,
    cvc,
    address,
    email,
    phone,
    amount
  })

  newPayment.save().then(() => {
    res.json("Payment Added")
  }).catch((err) => {
    console.log(err);
  })
})

router.route("/").get((req, res) => {
  payment.find().then((payment) => {
    res.json(payment)
  }).catch((err) => {
    console.log(err)
  })
})

router.get("/:id", async (req, res) => {
  try {
  let paymentID = req.params.id;

  let details = await payment.findById(paymentID)
    if (!details) {
      const error = new Error("Payment not found");
      error.status = 404;
      throw error;
    }
      res.json(details);
    }catch(err) {
      console.log(err.message);
      res.status(500).send({ status: "Error with get details", error: err.message });
    }

});

//report 
router.get("/reporting", async(_req, res, next) => {
  try{
    const Payments = await payment.find({}).sort({CreatedAt: -1});
    // start pdf document
    let doc = new PDFDocument({margim: 30,size: "A4"});
    // Simple Table with Array
    if(!Payments.length){
      const error = new Error("No Payment!!");
      error.status = 404;
      throw error;
    }
    const headers = [
      "Name",
      "Card Number",
      "Exp Year",
      "Exp Month",
      "CVC",
      "Address",
      "Email",
      "Phone",
      "Amount",
    ];
    const rows = [];
    Payments.map((i) => {
      rows.push([
        i.name,
        i.cardNumber,
        i.ExpYear,
        i.ExpMonth,
        i.cvc,
        i.address,
        i.email,
        i.phone,
        i.amount,
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
    //done
    doc.end();
  }catch (err) {
    console.error(err.message);
    next(err);
  }
});

//update
router.route("/update/:id").put(async (req, res) => {
  let paymentID = req.params.id
  const { name, cardNumber, ExpYear, ExpMonth, cvc, address, email, phone, amount } = req.body

  const updatePayment = {
    name,
    cardNumber,
    ExpYear,
    ExpMonth,
    cvc,
    address,
    email,
    phone,
    amount
  }

  const update = await payment.findByIdAndUpdate(paymentID, updatePayment).then(() => {
    res.status(200).send({ status: "Payment Details updated" })
  }).catch((err) => {
    console.log(err);
    res.status(500).send({ status: "Error with updating details" });
  })
})

router.route("/delete/:id").delete(async (req, res) => {
  let paymentID = req.params.id;

  await payment.findByIdAndDelete(paymentID).then(() => {
    res.status(200).send({ status: "Payment deleted" });
  }).catch((err) => {
    console.log(err.message);
    res.status(500).send({ status: "Error with delete payment details", error: err.message });
  })
})


module.exports = router;