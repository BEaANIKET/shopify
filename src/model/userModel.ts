import mongoose from 'mongoose';

// Define the Mongoose schema for the User
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Client'],
        default: 'Client'
    },
    cart: {
        type: Array,
        default: []
    }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model('User', userSchema);
