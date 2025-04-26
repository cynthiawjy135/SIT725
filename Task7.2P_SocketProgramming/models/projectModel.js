const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});

const Project = mongoose.model('Projects', ProjectSchema);
module.exports = Project;