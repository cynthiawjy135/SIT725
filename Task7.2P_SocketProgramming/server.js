var express = require("express")
var app = express()
const cors = require('cors');
var port = process.env.port || 3004
const mongoose = require('mongoose');

const routes = require('./routes')

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", routes);

mongoose.connect('mongodb://localhost:27017/sit725', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

const http = app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

//Web Socket
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
    console.log('user disconnected');
    });

    setInterval(() => {
        const now = new Date();
        const time = {
            hours: now.getHours(),
            minutes: now.getMinutes()
        };

        socket.emit('time', `${time.hours}:${time.minutes}`); 
    }, 10000); 
});


