import express from 'express';

import {createStock,
    getAllStocks,getStockById,
    updateStock,
    deleteStock
} from '../controllers/Stock.js';

const router = express.Router();

router
.route('/')
.post(createStock)
.get(getAllStocks);

router.get('/:id', getStockById);

router.put('/:id', updateStock);

router.delete('/:id', deleteStock);

export default router;
