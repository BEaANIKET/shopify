import { timeStamp } from "console";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    deliveryAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    orderItem: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            }
        }
    ],
    orderStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Delivered', 'Cancelled', 'Returned'],
        default: 'Pending'
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Online', 'Cash on Delivery', 'PayPal', 'Card'],
        default: 'Online'
    },
    deliveryStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'On the way', 'Delivered', 'Cancelled', 'Returned'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Paid', 'Refunded', 'Failed'],
        default: 'Pending'
    },
    paymentRef: {
        type: String,
        required: true,
        default: ''
    },
    trackingNumber: {
        type: String,
        required: true,
        default: ''
    }
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
