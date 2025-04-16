const { projectService} = require('../services');

const projectController = {
  getMyProjects: async (req, res) => {
    try{
      const myprojects = await projectService.getMyProjects();
      res.json({ data: myprojects});
    } catch (error){
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = projectController;