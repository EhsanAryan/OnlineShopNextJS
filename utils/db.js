import mongoose from "mongoose";

const connect = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/shopping")
    console.log("Connected...");
}

const convertToObject = (doc) => {
    doc._id = doc._id.toString();
    return doc;
}

const db = { 
    connect,
    convertToObject
};
export default db;