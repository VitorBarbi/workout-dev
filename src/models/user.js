import mongoose from 'mongoose';

// Define the user schema (userSchema).
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create a User model based on the user schema (userSchema).
const User = mongoose.model('User', userSchema);

export default User;