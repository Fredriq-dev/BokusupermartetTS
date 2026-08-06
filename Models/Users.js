// mongoose
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// user schema
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
  phone: {
    type: String,
    required: true
  },
  role:{
    type: String,
    enum: ['admin', 'user'],
    required: true
  },
  timestamps: true // date created and date modified
});


// create model
const User = mongoose.model('User', userSchema);