import mongoose from "mongoose";
import "./db/config.js";
import Product from "./db/product.js";

const sampleProducts = [
  {
    name: "Wireless Bluetooth Headphones",
    price: 2999,
    category: "Electronics",
    company: "TechSound",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    inStock: true,
  },
  {
    name: "Smart Watch Pro",
    price: 12999,
    category: "Electronics",
    company: "TechWear",
    description: "Advanced smartwatch with fitness tracking, heart rate monitor, and GPS.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    inStock: true,
  },
  {
    name: "Cotton T-Shirt",
    price: 599,
    category: "Clothing",
    company: "FashionHub",
    description: "Comfortable 100% cotton t-shirt available in multiple colors.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    inStock: true,
  },
  {
    name: "Denim Jeans",
    price: 1999,
    category: "Clothing",
    company: "FashionHub",
    description: "Classic fit denim jeans with stretch comfort.",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    inStock: true,
  },
  {
    name: "Running Shoes",
    price: 3999,
    category: "Footwear",
    company: "SportMax",
    description: "Lightweight running shoes with cushioned sole for maximum comfort.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    inStock: true,
  },
  {
    name: "Leather Wallet",
    price: 1299,
    category: "Accessories",
    company: "LeatherCraft",
    description: "Genuine leather wallet with multiple card slots and cash compartment.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    inStock: true,
  },
  {
    name: "Laptop Backpack",
    price: 2499,
    category: "Accessories",
    company: "TechGear",
    description: "Durable laptop backpack with padded compartment for 15-inch laptops.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    inStock: true,
  },
  {
    name: "Coffee Maker",
    price: 3499,
    category: "Home & Kitchen",
    company: "HomeBrew",
    description: "Programmable coffee maker with 12-cup capacity and auto-shutoff.",
    image: "https://images.unsplash.com/photo-1517668808824-d6c75e0e5a0d?w=500",
    inStock: true,
  },
  {
    name: "Wireless Mouse",
    price: 899,
    category: "Electronics",
    company: "TechSound",
    description: "Ergonomic wireless mouse with 2.4GHz connectivity and long battery life.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",
    inStock: true,
  },
  {
    name: "Yoga Mat",
    price: 1299,
    category: "Sports",
    company: "FitLife",
    description: "Non-slip yoga mat with carrying strap, perfect for all yoga practices.",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500",
    inStock: true,
  },
  {
    name: "Sunglasses",
    price: 1999,
    category: "Accessories",
    company: "SunStyle",
    description: "UV protection sunglasses with polarized lenses and stylish frame.",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
    inStock: true,
  },
  {
    name: "Water Bottle",
    price: 499,
    category: "Sports",
    company: "FitLife",
    description: "Stainless steel water bottle, keeps drinks cold for 24 hours.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
    inStock: true,
  },
  {
    name: "Desk Lamp",
    price: 1499,
    category: "Home & Kitchen",
    company: "HomeBrew",
    description: "LED desk lamp with adjustable brightness and color temperature.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
    inStock: true,
  },
  {
    name: "Gaming Keyboard",
    price: 4999,
    category: "Electronics",
    company: "TechSound",
    description: "Mechanical gaming keyboard with RGB backlighting and programmable keys.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    inStock: true,
  },
  {
    name: "Hoodie",
    price: 2499,
    category: "Clothing",
    company: "FashionHub",
    description: "Warm and comfortable hoodie with front pocket and drawstring hood.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
    inStock: true,
  },
  {
    name: "Dumbbells Set",
    price: 2999,
    category: "Sports",
    company: "FitLife",
    description: "Adjustable dumbbells set, perfect for home workouts.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    inStock: true,
  },
  {
    name: "Tablet Stand",
    price: 799,
    category: "Accessories",
    company: "TechGear",
    description: "Adjustable tablet stand compatible with all tablet sizes.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
    inStock: true,
  },
  {
    name: "Blender",
    price: 2999,
    category: "Home & Kitchen",
    company: "HomeBrew",
    description: "Powerful blender with multiple speed settings for smoothies and more.",
    image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=500",
    inStock: true,
  },
  {
    name: "Casual Sneakers",
    price: 3499,
    category: "Footwear",
    company: "SportMax",
    description: "Comfortable casual sneakers perfect for everyday wear.",
    image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500",
    inStock: true,
  },
  {
    name: "Phone Case",
    price: 399,
    category: "Accessories",
    company: "TechGear",
    description: "Protective phone case with shock absorption and raised edges.",
    image: "https://images.unsplash.com/photo-1601972602237-8c79241e468b?w=500",
    inStock: true,
  },
  {
    name: "Winter Jacket",
    price: 4999,
    category: "Clothing",
    company: "FashionHub",
    description: "Warm winter jacket with water-resistant outer shell and insulated lining.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    inStock: true,
  },
  {
    name: "Fitness Tracker",
    price: 3999,
    category: "Electronics",
    company: "TechWear",
    description: "Advanced fitness tracker with heart rate, sleep tracking, and step counter.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500",
    inStock: true,
  },
  {
    name: "Office Chair",
    price: 8999,
    category: "Home & Kitchen",
    company: "HomeBrew",
    description: "Ergonomic office chair with lumbar support and adjustable height.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
    inStock: true,
  },
  {
    name: "Baseball Cap",
    price: 699,
    category: "Accessories",
    company: "SunStyle",
    description: "Classic baseball cap with adjustable strap and breathable fabric.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500",
    inStock: true,
  },
  {
    name: "Hiking Boots",
    price: 5999,
    category: "Footwear",
    company: "SportMax",
    description: "Durable hiking boots with waterproof membrane and superior traction.",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500",
    inStock: true,
  },
  {
    name: "Wireless Earbuds",
    price: 2499,
    category: "Electronics",
    company: "TechSound",
    description: "True wireless earbuds with noise cancellation and 8-hour battery.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    inStock: true,
  },
  {
    name: "Formal Shirt",
    price: 1499,
    category: "Clothing",
    company: "FashionHub",
    description: "Classic formal shirt with crisp collar and button-down design.",
    image: "https://images.unsplash.com/photo-1594938291221-94f313b0e69d?w=500",
    inStock: true,
  },
  {
    name: "Resistance Bands",
    price: 899,
    category: "Sports",
    company: "FitLife",
    description: "Set of resistance bands with different resistance levels for full-body workouts.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500",
    inStock: true,
  },
  {
    name: "USB-C Cable",
    price: 299,
    category: "Electronics",
    company: "TechGear",
    description: "Fast charging USB-C cable, 6 feet long with durable braided design.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    inStock: true,
  },
  {
    name: "Throw Pillow",
    price: 599,
    category: "Home & Kitchen",
    company: "HomeBrew",
    description: "Decorative throw pillow with soft cover, perfect for home decor.",
    image: "https://images.unsplash.com/photo-1584100936595-8b8a97b13d8d?w=500",
    inStock: true,
  },
];

async function seedDatabase() {
  try {
    // Wait for MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.log("Waiting for MongoDB connection...");
      await new Promise((resolve) => {
        mongoose.connection.once("connected", resolve);
        setTimeout(resolve, 5000); // Timeout after 5 seconds
      });
    }

    if (mongoose.connection.readyState !== 1) {
      console.error("❌ MongoDB not connected. Please start MongoDB first.");
      process.exit(1);
    }

    console.log("✅ MongoDB connected");

    // Clear existing products
    await Product.deleteMany({});
    console.log("🗑️  Cleared existing products");

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log(`✅ Seeded ${sampleProducts.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();

