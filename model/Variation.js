import mongoose from 'mongoose';

const variationSchema = new mongoose.Schema(
    {
        attributes: {
            color: { type: String, required: true },
            size: { type: String, required: true },
            ram: { type: String }, // For mobile products (optional)
            storage: { type: String }, // For mobile products (optional)
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

const Variation = mongoose.model('Variation', variationSchema);

export default Variation;
