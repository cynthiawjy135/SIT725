const { User } = require('../models');

/**
 * This method is responsible to either get all the users form
 @param {*} parameter
 */

const userService = {
    createNewUser: async(parameter)=>{
        try {
            const newUser = new User({
              first_name: parameter.first_name,
              last_name: parameter.last_name,
              password: parameter.password,
              email: parameter.email
            });

            const response = await newUser.save();
            return { success: true, data: response };
            
          } catch (err) {
            console.error('Error in createMessage:', err);
            throw new Error('Error saving message');
          }
    },
    getAllUsers: async()=>{
        return await User.find();
    },
    getUserByEmail: async (email) => {
      return await User.findOne({ email });
    }
}

module.exports = userService