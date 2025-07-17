// config/db.js
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo connecté');
  } catch (err) {
    console.error('Conection error to database MongoDB:', err);
    process.exit(1); // Quitte l'application avec une erreur
  }
};

export default connectDB; 

