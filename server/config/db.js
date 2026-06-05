import mongoose from "mongoose";
import 'dotenv/config';

const URI = process.env.MONGO_URI;

if(!URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env');
}

mongoose.connect(URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(e => {
    console.error(e);
});