const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        required: true
    }
}, { timestamps: true })

const entryModel = mongoose.model("entry", entrySchema);

module.exports = entryModel;