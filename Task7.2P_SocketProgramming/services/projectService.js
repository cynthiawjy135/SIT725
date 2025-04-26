const { projectController } = require('../controllers');
const { Project } = require('../models');

/**
 * This method is responsible to either get all the users form
 * @param {*} userId
 */

const projectService = {
    getMyProjects: async()=>{
        return await Project.find();
    },
    getOneProject: async()=>{
        return await Project.find(userId);
    }
}

module.exports = projectService