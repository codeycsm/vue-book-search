const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {PORT, MONGO_URI} = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/api/bookRoutes');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/book-search', bookRoutes);



if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + "/public/"));
    app.get(/.*/, (req, res) => {
        res.sendFile(__dirname +  "/public/index.html");
    })
}

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB connected."))
.catch((err) => console.log(err));

app.listen(PORT, () => console.log(`App up`))