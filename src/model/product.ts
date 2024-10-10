import { timeStamp } from 'console';
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    size: {
        type: [String],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
        match: /^\d+(\.\d{1,2})?$/,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: [String],
        required: true,
    },
    deliveryInfo: {
        type: String,
        required: true,
    },
    onSale: {
        type: String,
        enum: ["Yes", "No"],
        required: true,
    },
    priceDrop: {
        type: Number,
        min: 0,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);


