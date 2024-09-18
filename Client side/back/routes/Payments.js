const router = require("express").Router();
let payment = require("../models/paymentModel");

router.route("/add").post((req,res)=>{
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

    newPayment.save().then(()=>{
        res.json("Payment Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    payment.find().then((payment)=>{
        res.json(payment)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/:id").get(async (req,res)=>{
    let paymentID = req.params.id;
    
    const details = await payment.findById(paymentID)
    .then((paymentDetails)=>{
        res.status(200).send({status: "details fetched", paymentDetails})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get details", error: err.message});  
    })
    
})

//update
router.route("/update/:id").put(async (req,res) => {
    let paymentID = req.params.id
    const {name, cardNumber, ExpYear, ExpMonth, cvc, address, email, phone, amount} = req.body

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
        res.status(200).send({status: "Payment Details updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating details"});
    })
})

router.route("/delete/:id").delete(async (req, res) => {
    let paymentID = req.params.id;

    await payment.findByIdAndDelete(paymentID).then(() => {
        res.status(200).send({status: "Payment deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete payment details", error: err.message});
    })
})


module.exports = router;