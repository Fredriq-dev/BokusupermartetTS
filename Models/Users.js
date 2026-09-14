// mongoose - this serves as an entry point to mongodb and helps structure the data in a more organized way
// npm i mongoose - this command is used to install mongoose package in the project
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // npm i bcryptjs - this command is used to install bcryptjs package in the project. It is used to hash passwords before storing them in the database for security purposes.

// user schema/properties - this defines the structure/properties of the user model in the database
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true
  },
  HasAdminAccess: {
    type: Boolean,
    default: false
  },
  phone: {
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: ['superadmin', 'storekeeper', 'salesperson'],// defines the allowed roles
    default: 'salesperson'
  },
},
{timestamps: true} // for logging date created and date modified
);


// create model - ths creates a model based on the user schema defined above. The model is used to interact with the users collection in the database.
const User = mongoose.model('User', userSchema);

module.exports = User; //export the model to be used in other files

