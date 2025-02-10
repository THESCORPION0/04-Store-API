import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import connectDB from './db/connect.js';
import { productRouter } from './routes/products.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware:
app.use(express.json());

// Routes
app.use('/api/v1/products', productRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("CONNECTED TO DB...");

    app.listen(PORT, () => {
      console.log(`SERVER IS LISTENING ON PORT ${PORT}...`);
    })
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

start();
