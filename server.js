const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {PORT, mongoUri} = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/api/bookRoutes');
// const path = require('path');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use('/api/book-search', bookRoutes);

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("MongoDB connected."))
.catch((err) => console.log(err));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/dist'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
    })
}

app.listen(PORT, () => console.log(`http://localhost:${PORT}/api`))