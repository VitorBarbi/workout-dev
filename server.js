import express from 'express';
import connectDB from './src/config/database.js';

const app = express();
const port = process.env.PORT || 3000;

await connectDB();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});