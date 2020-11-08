const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {PORT, mongoUri} = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/api/bookRoutes');
const path = require('path');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/api/book-search', bookRoutes);



if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + "/public/"));
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname +  "/public/index.html");
    })
}

mongoose.connect("mongodb+srv://codeycsm:GDZfinnUDGy6wzaf@cluster0.b2ixv.mongodb.net/book-list?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB connected."))
.catch((err) => console.log(err));

app.listen(PORT, () => console.log(`App up`))