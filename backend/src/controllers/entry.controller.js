const mongoose = require("mongoose");
const entryModel = require("../models/entry.model")

async function create(req, res) {
    const { title, type, amount, category } = req.body;

    //checking if there is no blank field
    if (!title.trim() || !type.trim() || !amount.trim() || !category.trim()) {
        return res.status(400).json({
            message: "All fields are required"
        })
    }


    //saving in db and returning the response
    const entry = await entryModel.create({
        title: title.trim(),
        type: type.trim(),
        category: category.trim(),
        amount: amount.trim(),
        user: req.user._id
    })

    return res.status(200).json({
        message: {
            title,
            type,
            category,
            amount,
        }
    })
}

async function fetch(req, res) {
    const entries = await entryModel.find({
        user: req.user._id
    });
    return res.status(200).json({
        entries
    })
}

async function remove(req, res) {
    const id = req.params.id;

    // finding if id is correct or not 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Entry not found"
        });
    }

    const entry = await entryModel.findOne({
        _id: id,
        user: req.user._id
    })


    if (!entry) {
        return res.status(400).json({
            message: "Entry not found"
        })
    }

    await entryModel.deleteOne({
        _id: id
    })

    return res.status(200).json({
        message: "Entry deleted successfully"
    })
}

async function removeAll(req, res) {


    const entry = await entryModel.find()
    console.log(entry);


    if (entry.length <= 0) {
        return res.status(400).json({
            message: "No Entries Found"
        })
    }

    await entryModel.deleteMany({
        user: req.user._id
    })

    return res.status(200).json({
        message: "All Entries Deleted successfully"
    })
}

async function fetchEntry(req, res) {
    const id = req.params.id;

    // finding if id is correct or not 
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Entry not found"
        });
    }

    const entry = await entryModel.findOne({
        _id: id
    })


    if (!entry) {
        return res.status(400).json({
            message: "Entry not found"
        })
    }


    return res.status(200).json({
        message: "Entry Fecthed Successfully",
        entry: {
            id: entry._id,
            title: entry.title,
            type: entry.type,
            amount: entry.amount,
            category: entry.category

        }
    })
}

module.exports = {
    create,
    fetch,
    remove,
    removeAll,
    fetchEntry

}