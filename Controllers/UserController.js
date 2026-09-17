const bcrypt = require('bcryptjs');
const User = require('../Models/Users');

// create a user
exports.createUser = async (req, res) => {
  try {
    // request body
    const { name, email, password, gender, phone, role, HasAdminAccess } = req.body;

    // check if all required fields are provided
    if (!name || !email || !password || !gender || !phone) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // email check
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // phone number check
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: 'Phone number already exists' });
    }

    // encrypt password
    const salt = await bcrypt.genSalt(2);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      phone: req.body.phone,
      role: req.body.role,// default role is 'user' if not provided
      HasAdminAccess: req.body.HasAdminAccess || false// default is false if not provided
    });

    // save the user to the database
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } 
  catch (error) {
    // console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


// login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // generate a token (you can use JWT or any other method to generate a token)
    //const token = generateToken(user); // implement your token generation logic here

    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};



