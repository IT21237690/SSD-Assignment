const router = require('express').Router();
const { body, param, validationResult } = require('express-validator');
const Product = require('../models/Product');
const User = require('../models/User');

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get products
router.get('/', async (req, res) => {
  try {
    const sort = { '_id': -1 };
    const products = await Product.find().sort(sort);
    res.status(200).json(products);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

// Create product
router.post(
  '/',
  [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('description').isString().notEmpty().withMessage('Description is required'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('category').isString().notEmpty().withMessage('Category is required'),
    body('images').isArray().withMessage('Images must be an array'),
    handleValidationErrors,
  ],
  async (req, res) => {
    try {
      const { name, description, price, category, images: pictures } = req.body;
      const product = await Product.create({ name, description, price, category, pictures });
      const products = await Product.find();
      res.status(201).json(products);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

// Update product
router.patch(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid product ID'),
    body('name').optional().isString().withMessage('Name must be a string'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('price').optional().isNumeric().withMessage('Price must be a number'),
    body('category').optional().isString().withMessage('Category must be a string'),
    body('images').optional().isArray().withMessage('Images must be an array'),
    handleValidationErrors,
  ],
  async (req, res) => {
    const { id } = req.params;
    try {
      const { name, description, price, category, images: pictures } = req.body;
      const product = await Product.findByIdAndUpdate(id, { name, description, price, category, pictures });
      const products = await Product.find();
      res.status(200).json(products);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

// Delete product
router.delete(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid product ID'),
    body('user_id').isMongoId().withMessage('Invalid user ID'),
    handleValidationErrors,
  ],
  async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
    try {
      const user = await User.findById(user_id);
      if (!user.isAdmin) return res.status(401).json("You don't have permission");
      await Product.findByIdAndDelete(id);
      const products = await Product.find();
      res.status(200).json(products);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

// Get a single product
router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid product ID'), handleValidationErrors],
  async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      const similar = await Product.find({ category: product.category }).limit(5);
      res.status(200).json({ product, similar });
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

// Get products by category
router.get(
  '/category/:category',
  [param('category').isString().withMessage('Invalid category'), handleValidationErrors],
  async (req, res) => {
    const { category } = req.params;
    try {
      let products;
      const sort = { '_id': -1 };
      if (category === 'all') {
        products = await Product.find().sort(sort);
      } else {
        products = await Product.find({ category }).sort(sort);
      }
      res.status(200).json(products);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

// Cart routes
router.post(
  '/add-to-cart',
  [
    body('userId').isMongoId().withMessage('Invalid user ID'),
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('price').isNumeric().withMessage('Price must be a number'),
    handleValidationErrors,
  ],
  async (req, res) => {
    const { userId, productId, price } = req.body;
    try {
      const user = await User.findById(userId);
      const userCart = user.cart;
      if (user.cart[productId]) {
        userCart[productId] += 1;
      } else {
        userCart[productId] = 1;
      }
      userCart.count += 1;
      userCart.total = Number(userCart.total) + Number(price);
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

const { body } = require('express-validator');

// Increase cart
router.post(
  '/increase-cart',
  [
    body('userId').isMongoId().withMessage('Invalid user ID'),
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('price').isNumeric().withMessage('Price must be a number'),
    handleValidationErrors, // Call the helper function to check for validation errors
  ],
  async (req, res) => {
    const { userId, productId, price } = req.body;
    try {
      const user = await User.findById(userId);
      const userCart = user.cart;
      userCart.total += Number(price);
      userCart.count += 1;
      userCart[productId] += 1;
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

// Decrease cart
router.post(
  '/decrease-cart',
  [
    body('userId').isMongoId().withMessage('Invalid user ID'),
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('price').isNumeric().withMessage('Price must be a number'),
    handleValidationErrors,
  ],
  async (req, res) => {
    const { userId, productId, price } = req.body;
    try {
      const user = await User.findById(userId);
      const userCart = user.cart;
      userCart.total -= Number(price);
      userCart.count -= 1;
      userCart[productId] -= 1;
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

// Remove from cart
router.post(
  '/remove-from-cart',
  [
    body('userId').isMongoId().withMessage('Invalid user ID'),
    body('productId').isMongoId().withMessage('Invalid product ID'),
    body('price').isNumeric().withMessage('Price must be a number'),
    handleValidationErrors,
  ],
  async (req, res) => {
    const { userId, productId, price } = req.body;
    try {
      const user = await User.findById(userId);
      const userCart = user.cart;
      userCart.total -= Number(userCart[productId]) * Number(price);
      userCart.count -= userCart[productId];
      delete userCart[productId];
      user.cart = userCart;
      user.markModified('cart');
      await user.save();
      res.status(200).json(user);
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

module.exports = router;
