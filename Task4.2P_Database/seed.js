const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sit725', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

//2. Define schema and model
const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});
const Project = mongoose.model('Projects', ProjectSchema);

const sampleProject = new Project({
    title: "Penguin 4",
    image: "images/penguin.png",
    link: "About Penguin 4",
    description: "Hi this is Penguin 4 in Database"
    });

//For insert many data to DB
/*Project.insertMany(sampleData)
.then(() => {
      console.log("Sample data inserted");
      mongoose.connection.close();
})
.catch(err => console.error(err));*/

sampleProject.save().then(() => console.log("Sample projectsaved!"));