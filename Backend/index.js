const express = require("express")
const mongoose = require("mongoose");
const Book = require("./models/book.model");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 4000

mongoose.connect("mongodb://localhost:27017/book-app")
    .then(()=>{console.log("MongDB Database Connected Successfully")})
    .catch((err)=>{console.log("MongoDB Connection Failed !!!!!:", err)});

app.use(express.json())
app.use(cors());
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send(`<h1>Rest API Books Crud</h1>`)
})

// books api crud

// create book route and controller
app.post("/api/book", async (req, res) => {
    try {
        const { title, author, no_of_pages } = req.body;
        const book = await Book.create({ title, author, no_of_pages });
        res.status(201).json({ message: "Book created successfully", book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// getAllBooks route and controller
app.get("/api/books", async (req,res)=>{
    try {
        const allBooks = await Book.find({})
        res.status(200).json({ message: "All books found successfully", allBooks })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// get book
app.get("/api/books/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        res.status(200).json({ message: "Book found successfully", book })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// update book route and controller
app.patch("/api/books/:id", async(req,res)=>{
    try {
        const {id} = req.params
        const book = await Book.findByIdAndUpdate(id, req.body, {new: true})

        if(!book){
            return res.status(404).json({message: "Book not found"})
        }

        res.status(200).json({ message: "Book updated successfully", book })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete book route and controller
app.delete("/api/books/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const book = await Book.findByIdAndDelete(id);

        if(!book){
            return res.status(404).json({message: "Book not found"})
        }

        res.status(200).json({message: "Book Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})   
    }
})

app.listen(port, ()=>{
    console.log(`Server at http://localhost:${port}`)
})