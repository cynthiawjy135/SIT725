var express = require("express")
var app = express()
var port = process.env.port || 3004
const mongoose = require('mongoose');

const routes = require('./routes')

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

mongoose.connect('mongodb://localhost:27017/sit725', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

//Start server
app.listen(port, () => {
console.log(`App listening on port ${port}`);
});
