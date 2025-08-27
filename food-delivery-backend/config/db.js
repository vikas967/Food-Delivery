import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://deppubadshah:m4pRfIBItqWp5DbZ@cluster0.tqiarwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=> console.log("DB Connected"))
}