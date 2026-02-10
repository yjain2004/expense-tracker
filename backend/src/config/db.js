const mongoose = require("mongoose");

async function connectDb() {
    try {
        mongoose.connect(process.env.MONGO)
        console.log("MongoDB Connected");

    } catch (error) {
        console.error("Failed to connect to database: ", error);

    }
}

module.exports = connectDb;