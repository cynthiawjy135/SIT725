const { userService} = require('../services');

const userController = {
  saveNewUser: async (req, res) => {
    try{
      const parameter = req.body;
      const user = await userService.createNewUser(parameter);
      res.json({
        status: 200,
        data: user.message
      })
    } catch (error){
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = userController;
