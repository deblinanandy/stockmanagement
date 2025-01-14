import mongoose from 'mongoose';
import Category from './Category.js';
import Variation from './Variation.js';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        images: {
            type: [String], // Array of image URLs
            required: true,
        },
        variations: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Variation',
        }],
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
