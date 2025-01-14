import Stock from '../model/Stock.js';
import Product from '../model/Product.js';
import Variation from '../model/Variation.js';

// Create stock record
export const createStock = async (req, res) => {
    try {
        const { productId, variationId, quantity } = req.body;

        // Check if the product and variation exist
        const product = await Product.findById(productId);
        const variation = await Variation.findById(variationId);

        if (!product || !variation) {
            return res.status(404).json({ success: false, message: 'Product or Variation not found' });
        }

        // Create stock record
        const stock = new Stock({
            product: productId,
            variation: variationId,
            quantity,
        });

        await stock.save();

        return res.status(201).json({ success: true, message: 'Stock created successfully', stock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get stock for a product variation
export const getStock = async (req, res) => {
    try {
        const { productId, variationId } = req.params;

        // Find the stock by product and variation
        const stock = await Stock.findOne({ product: productId, variation: variationId });

        if (!stock) {
            return res.status(404).json({ success: false, message: 'Stock not found for this variation' });
        }

        return res.status(200).json({ success: true, stock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update stock quantity
export const updateStock = async (req, res) => {
    try {
        const { stockId } = req.params;
        const { quantity } = req.body;

        // Find and update stock record
        const stock = await Stock.findByIdAndUpdate(
            stockId,
            { quantity },
            { new: true }
        );

        if (!stock) {
            return res.status(404).json({ success: false, message: 'Stock record not found' });
        }

        return res.status(200).json({ success: true, message: 'Stock updated successfully', stock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete stock record
export const deleteStock = async (req, res) => {
    try {
        const { stockId } = req.params;

        // Delete stock record
        const stock = await Stock.findByIdAndDelete(stockId);

        if (!stock) {
            return res.status(404).json({ success: false, message: 'Stock record not found' });
        }

        return res.status(200).json({ success: true, message: 'Stock record deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
