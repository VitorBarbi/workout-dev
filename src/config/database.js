import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

/**
 * Asynchronously connects to the MongoDB database.
 */
const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log(`Connected to ${uri}`);
    } catch (err) {
        console.error('Error connecting to MongoDB: ', err.message);
        // Exit the process with a failure status code (1)
        process.exit(1);
    }
}

export default connectDB;