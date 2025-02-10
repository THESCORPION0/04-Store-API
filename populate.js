import dotenv from 'dotenv';
import fs from 'fs/promises'; // Use promises for async read
import connectDB from './db/connect.js';
import Product from './models/product.js';
// import products from './products.json' assert { type: 'json' }; // Importing JSON file Still Experimental

dotenv.config();

const start = async () => {
  try {
    // Connect to the database
    await connectDB(process.env.MONGO_URI);

    // Read and parse products.json asynchronously
    const jsonProducts = await fs.readFile('./products.json', 'utf-8');
    const products = JSON.parse(jsonProducts);

    // Clear existing products and insert new ones
    await Product.deleteMany(); // Clear existing products (if needed)
    await Product.create(products); // Insert new products

    console.log('SUCCESS !!!!');
    process.exit(0);
  } catch (error) {
    console.log(error); // Log any errors that occur
    process.exit(1);
  }
};

start();

