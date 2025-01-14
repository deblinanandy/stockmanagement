import Product from '../model/Product.js';
import Category from '../model/Category.js';
import Variation from '../model/Variation.js';

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, category, images, variations } = req.body;

        // Check if category exists
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ success: false, message: 'Category does not exist' });
        }

        // Check if variations exist
        const variationsExist = await Variation.find({ '_id': { $in: variations } });
        if (variationsExist.length !== variations.length) {
            return res.status(400).json({ success: false, message: 'One or more variations do not exist' });
        }

        // Create new product
        const product = new Product({
            name,
            description,
            category,
            images,
            variations,
        });

        await product.save();

        return res.status(201).json({ success: true, message: 'Product created successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category').populate('variations');

        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, message: 'No products found' });
        }

        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findById(productId).populate('category').populate('variations');

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, category, images, variations } = req.body;

        // Check if category exists
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(400).json({ success: false, message: 'Category does not exist' });
        }

        // Check if variations exist
        const variationsExist = await Variation.find({ '_id': { $in: variations } });
        if (variationsExist.length !== variations.length) {
            return res.status(400).json({ success: false, message: 'One or more variations do not exist' });
        }

        const product = await Product.findByIdAndUpdate(
            productId,
            { name, description, category, images, variations },
            { new: true }
        ).populate('category').populate('variations');

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product updated successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
