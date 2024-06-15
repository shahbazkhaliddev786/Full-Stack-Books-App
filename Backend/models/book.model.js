const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "Please enter book title"]
    },
    author:{
        type: String,
        required: [true, "Please enter book' author name"]
    },
    no_of_pages:{
        type: Number,
        required: [true, "Please enter number of pages book"],
        default: 0
    },
    published_at: { type: Date, default: Date.now }
},{timestamps:true});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;