import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "./db/config.js";
import User from "./db/user.js";
import Product from "./db/product.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).send({ 
        success: false, 
        error: "Database not connected. Please ensure MongoDB is running." 
      });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, error: "Email is already registered" });
    }

    if (password.length < 6) {
      return res.status(200).send({
        success: false,
        error: "Password must be at least 6 characters long",
      });
    }

    const user = new User({ name, email, password });
    let result = await user.save();
    result = result.toObject();
    delete result.password;

    res.status(201).send({
      success: true,
      message: "Registration successful",
      data: result,
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send({ 
      success: false, 
      error: error.message || "Internal server error" 
    });
  }
});

// Login API
app.post("/login", async (req, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).send({ 
        success: false, 
        error: "Database not connected. Please ensure MongoDB is running." 
      });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ error: "Email and password are required", success: false });
    }

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ success: false, error: "No user found" });
    }

    if (password !== user.password) {
      return res
        .status(401)
        .send({ success: false, error: "Invalid credentials" });
    }

    const userData = { ...user._doc };
    delete userData.password;

    res.status(200).send({ success: true, user: userData });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ 
      success: false, 
      error: error.message || "Server error" 
    });
  }
});

// Get products with pagination and filters
app.get('/api/products', async (req, res) => {
  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).send({ 
        success: false, 
        error: "Database not connected. Please ensure MongoDB is running." 
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    // Category filter
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }

    // Price filter
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) {
        filter.price.$gte = parseFloat(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filter.price.$lte = parseFloat(req.query.maxPrice);
      }
    }

    // Stock filter
    if (req.query.inStock !== undefined) {
      filter.inStock = req.query.inStock === 'true';
    }

    // Get total count for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    // Get products with pagination
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get unique categories for filter options
    const categories = await Product.distinct('category');

    return res.status(200).send({
      success: true,
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
      filters: {
        categories,
      },
    });

  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).send({
      success: false,
      error: error.message || "Internal Server Error"
    });
  }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).send({ 
        success: false, 
        error: "Database not connected." 
      });
    }

    const categories = await Product.distinct('category');
    return res.status(200).send({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).send({
      success: false,
      error: error.message || "Internal Server Error"
    });
  }
});



const PORT = 1709;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
