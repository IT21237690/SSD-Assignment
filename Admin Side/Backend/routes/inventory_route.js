const express = require("express");
const router = express.Router();
const Inventory = require("../models/inventory");
const emailSendSchema = require("../models/emailSend");
const path = require("path");
const multer = require("multer");
const fs = require("fs/promises");
const PDFDocument = require("pdfkit-table");

// store the image
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (_req, file, cb) {
    const timestamp = Date.now();
    const ext = file.originalname.split(".").pop();
    const filename = `${timestamp}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage }).single("file");

//convert date to IST
function convertToIST(utcDateStr) {
  const date = new Date(utcDateStr);
  const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
  const istDate = new Date(date.getTime() + istOffset);
  const year = istDate.getUTCFullYear();
  const month = ("0" + (istDate.getUTCMonth() + 1)).slice(-2); // Add leading zero if needed
  const day = ("0" + istDate.getUTCDate()).slice(-2); // Add leading zero if needed
  return `${year}-${month}-${day}`; //YYYY-MM-DD
}

// @route   GET api/inventory
// @desc    Get all inventories
router.get("/", async (_req, res, next) => {
  try {
    const inventories = await Inventory.find({}).sort({ CreatedAt: -1 });
    res.status(200).json(inventories);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});


// @route   POST api/inventory
// @desc    Add new inventory
router.post("/", async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      const { name, quantity, price, dateOfPurchase } = req.body;
      const file = req.file;
      if (err) {
        throw new Error(err);
      }
      // check if inventory already exists
      const isInventoryAvailable = await Inventory.findOne({ name });
      if (isInventoryAvailable) {
        const error = new Error("Inventory already exists");
        error.status = 404;
        throw error;
      }

      let inventory = new Inventory({
        name,
        image: file ? file.filename : "",
        quantity,
        price,
        dateOfPurchase,
      });
      await inventory.save();
      return res.status(200).send("Inventory added successfully");
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
// @route   POST api/inventory/emailSent
// @desc    set email sent date
router.post("/emailSent", async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!ids.length) {
      const error = new Error("No Inventories exists");
      error.status = 404;
      throw error;
    }
    const emailSentDate = new Date();
    const emailSentItems = [];
    for (const id of ids) {
      const inventoryItem = await Inventory.findById(id);
      // check if inventory item exists
      if (inventoryItem) {
        const emailSentItem = new emailSendSchema({
          inventoryId: id,
          emailSentDate: emailSentDate,
        });
        emailSentItems.push(emailSentItem);
      }
    }
    if (emailSentItems.length) {
      await emailSendSchema.insertMany(emailSentItems);
    }
    res.send("Email sent items added successfully");
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});
// @route   POST api/inventory/emailSentDates
// @desc    get email sent dates
router.post("/emailSentDates", async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!ids.length) {
      const error = new Error("No Inventory Ids passed");
      error.status = 404;
      throw error;
    }
    // below query will return the latest email sent date with inventoryId for each inventory item
    const inventoryItemsDates = await emailSendSchema.aggregate([
      {
        $match: {
          inventoryId: { $in: ids },
        },
      },
      {
        $sort: {
          emailSentDate: -1,
        },
      },
      {
        $group: {
          _id: "$inventoryId",
          emailSentDate: { $first: "$emailSentDate" },
        },
      },
      {
        $project: {
          _id: 0,
          inventoryId: "$_id",
          emailSentDate: 1,
        },
      },
    ]);

    res.json(inventoryItemsDates);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route   GET api/inventory
// generate report
router.get("/reporting", async (_req, res, next) => {
  try {
    const inventories = await Inventory.find({}).sort({ CreatedAt: -1 });
    // start pdf document
    let doc = new PDFDocument({ margin: 30, size: "A4" });

    if (!inventories.length) {
      const error = new Error("No Inventoris exists");
      error.status = 404;
      throw error;
    }
    const headers = [
      "Name",
      "Quantity",
      "Init Qty Different",
      "Price",
      "Purchase Date",
    ];
    const rows = [];
    inventories.map((i) => {
      rows.push([
        i.name,
        i.quantity,
        i.initialQuantity - i.quantity || 0,
        i.price.toFixed(2),
        convertToIST(i.dateOfPurchase),
      ]);
    });
    const tableArray = {
      headers: headers,
      rows: rows,
    };
    doc.table(tableArray, {
      prepareHeader: () => doc.font("Helvetica-Bold").fontSize(8),
      prepareRow: (_row, indexColumn, indexRow, rectRow) => {
        doc.font("Helvetica").fontSize(9);
        indexColumn === 0 &&
          doc.addBackground(rectRow, indexRow % 2 ? "yellow" : "green", 0.15);
      },
    });
    // create a buffer from the PDF document
    let chunks = [];
    doc.on("data", (chunk) => {
      chunks.push(chunk);
    });
    doc.on("end", () => {
      const pdfBlob = Buffer.concat(chunks);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="myfile.pdf"');
      res.send(pdfBlob);
    });

    // done
    doc.end();
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route   get api/inventory/:id
// @desc    Get inventory by ID
router.get("/:id", async (req, res, next) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ msg: "Id not available!" });
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      const error = new Error("Inventory not found");
      error.status = 404;
      throw error;
    }
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route   PUT api/inventory/:id
// @desc    Update inventory
router.put("/:id", async (req, res, next) => {
  try {
    upload(req, res, async (err) => {
      const { name, quantity, price, image, dateOfPurchase, upInitQty } =
        req.body;
      const file = req.file;
      if (err) {
        throw new Error(err);
      }

      if (file && image) {
        const filePath = path.join(__dirname, `../images/${image}`);
        // Check if the file exists before trying to delete it
        try {
          if (await fs.access(filePath)) {
            // Delete the file
            await fs.unlink(filePath);
          }
        } catch (error) {
          console.error(error);
        }
      }
      const invObj = {
        name,
        image: file ? file.filename : image ? image : "",
        quantity,
        price,
        dateOfPurchase,
      };
      //update the initialQuantity
      if (upInitQty == "true") {
        invObj.initialQuantity = quantity;
      }
      const document = await Inventory.findOneAndUpdate(
        { _id: req.params.id },
        {
          ...invObj,
        },
        { new: true }
      );
      if (!document) {
        const error = new Error("Inventory not found");
        error.status = 404;
        throw error;
      }
      res.status(200).send("Inventory updated successfully");
    });
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// @route   DELETE api/inventory/:id
// @desc    Delete inventory
router.delete("/:id", async (req, res, next) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory) {
      const error = new Error("Inventory not found");
      error.status = 404;
      throw error;
    }
    if (inventory.image) {
      const filePath = path.join(__dirname, `../images/${inventory.image}`);
      // Check if the file exists before trying to delete it
      try {
        if (await fs.access(filePath)) {
          // Delete the file
          await fs.unlink(filePath);
        }
      } catch (error) {
        console.error(error);
      }
    }

    await Inventory.findOneAndDelete({ _id: req.params.id });
    res.status(200).send("Inventory deleted successfully");
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
