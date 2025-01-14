import mongoose from 'mongoose';
import Product from './Product.js';
import Variation from './Variation.js';

const stockSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        variation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Variation',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 0, // Initial stock level for the variation
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;
