import Variation from '../model/Variation.js';

// Create a new product variation
export const createVariation = async (req, res) => {
    try {
        const { color, size, ram, storage, price, stock } = req.body;

        // Create a new variation
        const variation = new Variation({
            attributes: { color, size, ram, storage },
            price,
            stock,
        });

        await variation.save();

        return res.status(201).json({ success: true, message: 'Variation created successfully', variation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all variations
export const getVariations = async (req, res) => {
    try {
        const variations = await Variation.find();

        if (!variations || variations.length === 0) {
            return res.status(404).json({ success: false, message: 'No variations found' });
        }

        return res.status(200).json({ success: true, variations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get variation by ID
export const getVariationById = async (req, res) => {
    try {
        const { variationId } = req.params;

        const variation = await Variation.findById(variationId);

        if (!variation) {
            return res.status(404).json({ success: false, message: 'Variation not found' });
        }

        return res.status(200).json({ success: true, variation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a variation
export const updateVariation = async (req, res) => {
    try {
        const { variationId } = req.params;
        const { color, size, ram, storage, price, stock } = req.body;

        const variation = await Variation.findByIdAndUpdate(
            variationId,
            { attributes: { color, size, ram, storage }, price, stock },
            { new: true }
        );

        if (!variation) {
            return res.status(404).json({ success: false, message: 'Variation not found' });
        }

        return res.status(200).json({ success: true, message: 'Variation updated successfully', variation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a variation
export const deleteVariation = async (req, res) => {
    try {
        const { variationId } = req.params;

        const variation = await Variation.findByIdAndDelete(variationId);

        if (!variation) {
            return res.status(404).json({ success: false, message: 'Variation not found' });
        }

        return res.status(200).json({ success: true, message: 'Variation deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
