const { userService} = require('../services');

const userController = {
  saveNewUser: async (req, res) => {
    try{
      const parameter = req.body;

      // Simple field validation
      if (!parameter.first_name || !parameter.last_name || !parameter.password || !parameter.email) {
        return res.status(409).json({ message: 'Missing required fields' });
      }

      // Validasi format email
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(parameter.email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Check if the email is already exist in database
      const existingUser = await userService.getUserByEmail(parameter.email);
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }

      const user = await userService.createNewUser(parameter);
      res.status(200).json({
        status: 200,
        data: user.data
      })
    } catch (error){
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({
        status: 200,
        data: users
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

module.exports = userController;
