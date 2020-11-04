const { Router } = require('express');
const BookSchema = require('../../models/bookSchema');
const axios = require('axios');

const router = Router();

router.post("/find-books", async (req,res) => {
    try{
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.body.query}`);
        const books = []
        for(let i = 0; i < response.data.items.length; i++){
            books.push({
                title: response.data.items[i].volumeInfo.title,
                authors: response.data.items[i].volumeInfo.authors,
                description: response.data.items[i].volumeInfo.description,
                image: response.data.items[i].volumeInfo.imageLinks,
                pageCount: response.data.items[i].volumeInfo.pageCount,
                preview: response.data.items[i].volumeInfo.previewLink
            });
        }
        res.send(books)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post("/save-book", async (req, res) => {
    const newBook = new BookSchema(req.body.book);
    try{
        const book = await newBook.save();
        if(!book) throw new Error("Something went wrong saving the book.")
        res.status(200).json(book)
    }catch(error){
        res.status(500).json({message: error.message})
    }
});

router.get("/saved-books", async (req, res) => {
    try{
        const books = await BookSchema.find({});
        res.send(books)
    }catch(err){
        res.status(500).json({message: error.message})
    }
});

router.delete("/delete-book/:id", async (req, res) => {
    try{
        const deleteBook = await BookSchema.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteBook);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

module.exports = router;