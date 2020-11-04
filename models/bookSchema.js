const {Schema, model} = require('mongoose');

const BookSchema = new Schema({
    authors: {
        type: Array,
        required: true
    },
    image:{
        type: Object
    },
    pageCount: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})

const Book = model('book', BookSchema);

module.exports = Book;