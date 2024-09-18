const router = require('express').Router();
const Order = require('../models/Order');
const User = require('../models/User');
const PDFDocument = require("pdfkit-table");


//creating an order

router.post('/', async(req, res)=> {
  const io = req.app.get('socketio');
  const {userId, cart, number,ptime} = req.body;
  try {
    const user = await User.findById(userId);
    const order = await Order.create({owner: user._id, products: cart, number, ptime});
    order.count = cart.count;
    order.total = cart.total;
    await order.save();
    user.cart =  {total: 0, count: 0};
    user.orders.push(order);
    const notification = {status: 'unread', message: `New order from ${user.name}`, time: new Date()};
    io.sockets.emit('new-order', notification);
    user.markModified('orders');
    await user.save();
    res.status(200).json(user)

  } catch (e) {
    res.status(400).json(e.message)
  }
})


// getting all orders;
router.get('/', async(req, res)=> {
  try {
    const orders = await Order.find().populate('owner', ['email', 'name']);
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json(e.message)
  }
})


//shipping order

router.patch('/:id/mark-shipped', async(req, res)=> {
  const io = req.app.get('socketio');
  const {ownerId} = req.body;
  const {id} = req.params;
  try {
    const user = await User.findById(ownerId);
    await Order.findByIdAndUpdate(id, {status: 'shipped'});
    const orders = await Order.find().populate('owner', ['email', 'name']);
    const notification = {status: 'unread', message: `Order ${id} shipped with success`, time: new Date()};
    io.sockets.emit("notification", notification, ownerId);
    user.notifications.push(notification);
    await user.save();
    res.status(200).json(orders)
  } catch (e) {
    res.status(400).json(e.message);
  }
})

//report routes
router.get("/reporting", async (_req, res, next) => {
  try {
    const orders = await Order.find({}).sort({ createdAt: -1 });
    // start pdf document
    let doc = new PDFDocument({ margin: 30, size: "A4" });

    // -----------------------------------------------------------------------------------------------------
    // Simple Table with Array
    // -----------------------------------------------------------------------------------------------------
    if (!orders.length) {
      const error = new Error("No orders exist");
      error.status = 404;
      throw error;
    }
    const headers = [
      "Status",
      "Total",
      "Count",
      "Date",
      "Pickup",
    ];
    const rows = [];
    orders.map((i) => {
      rows.push([
        i.status,
        i.total,
        i.count,
        i.date,
        i.pickup,
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
      const currentDate = new Date().toISOString().slice(0, 10);
      const filename = `orders_report_${currentDate}.pdf`;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.send(pdfBlob);
    });

    // done
    doc.end();
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});


module.exports = router;
