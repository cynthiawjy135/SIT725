const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    password: String,
    email: String,
});

const User = mongoose.model('Users', UserSchema);
module.exports = User;