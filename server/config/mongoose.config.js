import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI
const DB_NAME = process.env.DB_NAME

async function dbConnect() {
    try {
        await connect(MONGODB_URI, {
            dbName: DB_NAME,
        });
        console.log(`You are connected to the ${DB_NAME}`);
    } catch (error) {
        console.log(error);
        throw error;
    };
}
export default dbConnect;

