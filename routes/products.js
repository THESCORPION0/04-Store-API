import express from 'express';
import { getAllProduct } from '../controllers/products.js';

const productRouter = express.Router();

productRouter.route('/').get(getAllProduct);

export { productRouter };