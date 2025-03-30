var express = require("express")
var app = express()
var port = process.env.port || 3004
const mongoose = require('mongoose');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/sit725', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

/*const sampleProject = new Project({
    title: "Penguin 4",
    image: "images/penguin.png",
    link: "About Penguin 4",
    description: "Hi this is Penguin 4 in Database"
    });

sampleProject.save().then(() => console.log("Sample projectsaved!"));
*/

//2. Define schema and model
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});
const Project = mongoose.model('Projects', ProjectSchema);

// 3. REST API route
app.get('/api/projects', async (req, res) => {
    const projects = await Project.find({});
    res.json({ statusCode: 200, data: projects, message: 'Success' });
});

// 4. Start server
app.listen(port, () => {
console.log(`App listening on port ${port}`);
});
